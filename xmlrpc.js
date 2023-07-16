const fs = require('fs');
const axios = require('axios');
require('colors');

const websitesFilePath = 'websites.txt';
const pingbackFilePath = 'pingback.txt';
const bruteFilePath = 'brute.txt';

const testedWebsites = {};

function hasMethod(website, method, filePath) {
    if (!fs.existsSync(filePath)) {
        return false;
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const lines = fileContent.split('\n');
    const methodLines = lines.filter(line => line.includes(' - Method: '));

    for (const line of methodLines) {
        const savedWebsite = line.split(' - Method: ')[0];
        const savedMethod = line.split(' - Method: ')[1];
        if (savedWebsite === website && savedMethod === method) {
            return true;
        }
    }

    return false;
}

async function checkXMLRPC(website, method, filePath) {
    const xmlrpcUrl = website + 'xmlrpc.php';

    if (hasMethod(website, method, filePath)) {
        console.log(`Skipping ${method} for ${website}`.yellow);
        return;
    }

    try {
        const response = await axios.post(xmlrpcUrl, `<?xml version="1.0" encoding="utf-8"?>
                                    <methodCall>
                                        <methodName>system.listMethods</methodName>
                                        <params></params>
                                    </methodCall>`, {
            timeout: 5000
        });

        if (response.status === 200) {
            console.log(`Checking XML-RPC endpoint at ${xmlrpcUrl}`.gray);

            const methods = response.data;

            if (methods.includes(method)) {
                console.log(`${method} method found at ${xmlrpcUrl}`.green);
                const successMessage = `${website} - Method: ${method}\n`;
                fs.appendFileSync(filePath, successMessage, 'utf-8');
            } else {
                console.log(`No ${method} method found at ${xmlrpcUrl}`.red);
            }

            console.log('----------------------------------------');
        } else {
            console.log(`XML-RPC endpoint not found at ${xmlrpcUrl}`.red);
        }
    } catch (error) {
        console.log(`Error checking XML-RPC endpoint at ${xmlrpcUrl} (${error.code} ${error.message})`.red);
    }
}

async function main() {
    try {
        const websites = fs.readFileSync(websitesFilePath, 'utf-8').split('\n');

        for (const website of websites) {
            if (website.trim() !== '') {
                await checkXMLRPC(website.trim(), 'pingback.ping', pingbackFilePath);
                await checkXMLRPC(website.trim(), 'wp.getUsersBlogs', bruteFilePath);
                await checkXMLRPC(website.trim(), 'system.multicall', bruteFilePath);
            }
        }
    } catch (error) {
        console.log('Error reading websites file');
        console.error(error);
    }
}

main();

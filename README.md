# Script de Verificação de XML-RPC em Sites

Este é um script Node.js que verifica se um site possui endpoints XML-RPC e identifica se determinados métodos estão disponíveis. Ele lê uma lista de sites de um arquivo de texto e faz requisições POST para os URLs de `/xmlrpc.php` de cada site para obter a lista de métodos disponíveis. O script verifica a presença dos métodos "pingback.ping", "wp.getUsersBlogs" e "system.multicall" em cada site e salva as informações em arquivos de texto correspondentes.

## Requisitos

- Node.js (versão 12 ou superior)
- npm (gerenciador de pacotes do Node.js)

## Instalação

1. Clone este repositório para o seu ambiente local.
2. Abra um terminal e navegue até o diretório do projeto.
3. Execute o seguinte comando para instalar as dependências:

   ```bash
   npm install

## Uso

1. Coloque a lista de sites que deseja verificar no arquivo `websites.txt`. Cada site deve ser colocado em uma nova linha.
2. Abra um terminal e navegue até o diretório do projeto.
3. Execute o seguinte comando para iniciar o script:

   ```bash
   npm start
   
## Resultados

- O arquivo `pingback.txt` conterá a lista de sites que possuem o método `pingback.ping`.
- O arquivo `brute.txt` conterá a lista de sites que possuem os métodos `wp.getUsersBlogs` e `system.multicall`.

## Notas

- O script verifica se um determinado método já foi testado para um site, com base nas informações salvas nos arquivos correspondentes. Isso evita a duplicação de resultados.
- O script usa a biblioteca `axios` para fazer as requisições HTTP e a biblioteca `colors` para fornecer cores no console.
- Certifique-se de que os arquivos `websites.txt`, `pingback.txt` e `brute.txt` estejam no mesmo diretório do script antes de executá-lo.

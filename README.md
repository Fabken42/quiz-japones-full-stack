# quiz-japones-full-stack

Pré-requisitos
Certifique-se de ter "Node.js versão 12 ou superior" instalado em seu sistema.
Crie um projeto no mongoDB Atlas e anote senha de usuário e string de conexão para utilizar no arquivo .env. Certifique-se de configurar o endereço IP para "0.0.0.0/0"

Passo 1: Clonar o repositório
------------------------------------------------------------------------------------------------------------------

Clone o repositório do projeto em seu computador usando o comando git clone ou baixe-o como arquivo ZIP e extraia-o.

bash:
git clone <URL DO REPOSITÓRIO>

Passo 2: Configurar o backend
------------------------------------------------------------------------------------------------------------------

Abra um terminal e navegue até a pasta "api" do projeto.

Crie um arquivo .env na pasta "api" e adicione as seguintes variáveis de ambiente, substituindo apenas os valores MONGO_URI e SECRET_KEY:

PORT=4200
MONGO_URI=<STRING_CONEXAO_MONGODB>
SECRET_KEY=<CRIE_SUA_PRÓPRIA_CHAVE_SECRETA>

Instale as dependências do backend executando o comando "npm install"
Após a conclusão da instalação, execute o comando "npm run populate" para popular o banco de dados com os registros iniciais.

Inicie o servidor backend com o comando "npm start"
O servidor backend será executado na porta especificada (4200).

Passo 3: Configurar o frontend
------------------------------------------------------------------------------------------------------------------
Abra outro terminal, navegue até a pasta "client" e execute o comando "npm install"

Inicie o servidor de desenvolvimento do frontend com o comando "npm start"



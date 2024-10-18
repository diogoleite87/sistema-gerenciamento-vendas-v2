### Projeto

Gerenciamento de Vendas - Ferramenta para gerenciar vendas, estoque, produtos, clientes e funcionários.

A ferramenta não aborda um contexto específico, podendo ser utilizado pela maioria das áreas de vendas. Inclusive é possível categorizar os produtos cadastrados dentro da ferramenta. Ex: Hortfruit, Açougue, Calçados, Camisetas e etc.

### 1. Funcionalidades implementadas

- Cadastro e Gerenciamento de Funcionários;
- Cadastro e Gerenciamento de Categorias;
- Cadastro e Gerenciamento de Clientes;
- Cadastro e Gerenciamento de Itens/Produtos;
- Cadastro e Gerenciamento de Estoque;
- Cadastro e Gerenciamento de Pedidos.

### Funcionalidades previstas e não implementadas

- Todas as funcionalidades e requisitos levantados para esta aplicação foram atendidos.

### Outras funcionalidades implementadas

- Controle e hierárquia de funcionários;
- Adição, recorte e ajustes de imagens em itens/produtos.

### Principais desafios e dificuldades

- O maior desafio em sistemas que envolvem cadastros de clientes, vendas, estoque, entre outros, é o fato de não podermos utilizar o comando `DELETE` do banco de dados em nenhuma ocasião. Isso se deve à necessidade de manter a rastreabilidade e a consistência dos registros, evitando a perda de qualquer informação ou histórico que tenha sido cadastrado na plataforma, seja relacionado a pedidos ou qualquer outra informação. Para contornar esse problema, o método utilizado é o uso de flags. Através delas, toda consulta e relação de registros devem respeitar uma flag que sinaliza se aquele registro está ativo ou não;

- Outro desafio importante é o cadastro de funcionários na plataforma. Devido à questão da segurança, é crucial adotar todos os cuidados necessários para garantir a integridade do sistema. É fundamental evitar que qualquer usuário possa comprometer a hierarquia de acesso ou burlar as restrições impostas.

### Instruções para instalação e execução

#### Backend

```bash

# Clone o repositório do backend
$ git clone https://github.com/diogoleite87/sistema-gerenciamento-vendas-v2.git

# Acesse a pasta do backend no terminal
$ cd backend

# Instale as dependências
$ npm install

-> Crie um arquivo .env seguindo os parâmetros do arquivo de exemplo .env.example na raiz do projeto. As informações inseridas serão usadas como credenciais do usuário mestre da aplicação.

# Execute a migration do Prisma para criar as relações das tabelas
$ npx prisma migrate dev

# Inicie o servidor
$ npm run dev

# O servidor será iniciado na porta disponível em sua máquina

```

#### Frontend

```bash

# Clone o repositório do frontend
$ git clone https://github.com/diogoleite87/sistema-gerenciamento-vendas-v2.git

# Acesse a pasta do frontend no terminal
$ cd frontend

# Instale as dependências
$ npm install

# Inicie a aplicação
$ npm run dev

# A aplicação será iniciada na porta disponível em sua máquina

```

# Test SPS Server

## 📝 Descrição

Este é um servidor Node.js que utiliza Express como framework principal para criação de APIs REST.

## 🛠 Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript
- **Express** - Framework web para Node.js
- **JWT (jsonwebtoken)** - Para autenticação e geração de tokens
- **Zod** - Biblioteca de validação de schemas
- **Cors** - Middleware para habilitar CORS
- **Dotenv** - Para gerenciamento de variáveis de ambiente
- **Body-parser** - Parser de requisições HTTP

### Ferramentas de Desenvolvimento

- **Nodemon** - Reinicialização automática do servidor durante desenvolvimento
- **ESLint** - Ferramenta de linting para JavaScript
- **Prettier** - Formatador de código
- **ESLint Config Prettier** - Integração entre ESLint e Prettier

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js instalado
- Yarn ou NPM instalado

### Instalação

1. Instale as dependências

```bash
yarn install
```

### Executando o Projeto

Para rodar em modo desenvolvimento:

```bash
yarn dev
# ou
npm run dev
```

O servidor iniciará na porta 7000 com suporte a debug.

### Scripts Disponíveis

- `yarn dev` - Inicia o servidor em modo desenvolvimento com hot-reload
- `yarn lint` - Executa verificação de lint no código
- `yarn lint:fix` - Corrige automaticamente problemas de lint
- `yarn format` - Formata o código usando Prettier

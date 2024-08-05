![Barber service](https://i.imgur.com/TCYBmWM.jpg)

<p align="center"><b>Projeto API Barber Service - Nest.js 💈 </b></p>

## 📝Sobre

Projeto de finalização do curso da trilha de Nest.js da Cubos Academy:
- API Rest
- Programação assíncrona
- CRUD
- JSON
- Framework Express.js
- Framework Nest.js
- Tipagem e orientação à objetos Typescript
- Criptografia bcrypt
- Token de autenticação JWT
- Validação class validator
- Eslint e Prettier para padronização

## ⚙️Funcionalidades
- Recurso de experts para: criação, alteração, listagem completa e busca por ID
- Recurso de queues para: criação, listagem e busca de fila do expert do dia atual
- Recurso de queues customers para: adicionar, atender e remover cliente da fila do dia
- Recurso de users para: criação de usuário para rotas autenticadas
- Recurso de auth para: login, validação e payload com profile do usuário logado

## 👨🏽‍💻Tecnologias
- Javascript
- Typescript
- Node.js
- Express.js
- Nest.js
- PrismaORM
- PostgreSQL

## 🔧Requisitos
- npm instalado na sua máquina
- node instalado na sua máquina
- editor de código instalado na sua máquina (recomendação: Visual Studio Code)

## 🖥️Como instalar
1. Clone este repositório;
2. Certifique-se de ter o Node.js e o PostgreSQL instalados em seu sistema;
3. Crie um banco de dados PostgreSQL e configure as variavéis de ambiente em um arquivo `.env` dentro da raiz do projeto seguindo o formato do `.env.example`;
4. Na raiz do projeto, execute `npm install` para instalar as dependências que estão listadas em `Tecnologias utilizadas` deste README;
5. Rode o comando `npx prisma migrate dev` no terminal;
6. Inicie o servidor no terminal com `npm run start`;
7. O sistema estará disponível em `http://localhost:3000`.

Certifique-se de que você possui todas as dependências instaladas (incluindo às necessàrias para seu controle local) e as variáveis de ambiente configuradas.
## Description


### Order Manager API
Este repositório contém uma API RESTful desenvolvida em NestJS para gerenciamento e processamento assíncrono de pedidos. O projeto utiliza um banco de dados relacional (PostgreSQL) para dados estruturados e um banco de dados NoSQL (MongoDB) para armazenamento de logs e dados não estruturados.


🚀 Funcionalidades
- Cadastro, listagem e detalhamento de pedidos
- Processamento assíncrono usando sistema de filas RabbitMQ
- Registro de logs de operações no MongoDB
- Documentação completa da API com Swagger
- Containerização com Docker e Docker Compose

📋 Pré-requisitos
- Node.js (v20 ou superior)
- npm
- PostgreSQL
- MongoDB
- RabbitMQ (para processamento assíncrono)
- Docker e Docker Compose (opcional, para containerização)


## 🔧 Configuração e Instalação
Configuração de Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto:

### Database
DATABASE_URL=
MONGO_URI=

### RabbitMQ
RABBITMQ_URI="amqp://localhost:5672"

## Setup do projeto

```bash
$ npm install
```

### Compilar e executar o projeto

```bash
# Gerar cliente Prisma
npx prisma generate

# Aplicar migrações
npx prisma migrate dev

# Iniciar em modo desenvolvimento
npm run start:dev

# Iniciar em modo produção
npm run build
npm run start:prod
```

### Utilizando Docker

- Construir e iniciar os containers
docker-compose up -d

- Verificar logs
docker-compose logs -f

### Documentação disponível na porta:
A documentação da API está disponível através do Swagger. Após iniciar a aplicação, acesse:
http://localhost:3000/api

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

# Documentação do Projeto Profarma

## Visão Geral

O **Profarma** é um projeto desenvolvido pela Mouts IT utilizando o framework NestJS. É uma aplicação backend robusta e escalável construída com TypeScript, seguindo princípios de arquitetura limpa e boas práticas de desenvolvimento.

## Tecnologias Principais

- **Framework**: NestJS 11.x
- **Linguagem**: TypeScript 5.7.x
- **Banco de Dados**: PostgreSQL com Prisma ORM
- **Containerização**: Docker e Docker Compose
- **Testes**: Jest
- **Linting**: ESLint + Prettier
- **Build**: SWC

## Estrutura do Projeto

### 📁 Diretórios Raiz

#### `.git/`

- Contém o repositório Git com histórico de commits e branches

#### `.vscode/`

- Configurações específicas do Visual Studio Code para o projeto
- Inclui configurações de debug, extensões recomendadas e formatação

#### `.husky/`

- Hooks do Git para automação de tarefas
- Garante que certas verificações sejam executadas antes de commits como lint, tipagens e testes.

#### `node_modules/`

- Dependências do Node.js instaladas via npm
- Gerado automaticamente ao executar `npm install`

#### `dist/`

- Código compilado/transpilado para produção
- Gerado ao executar `npm run build`

#### `reports/`

- Relatórios gerados pelos testes e ferramentas de análise
- Inclui relatórios de cobertura de testes

### 📁 Diretórios de Configuração

#### `src/`

- **Diretório principal** contendo todo o código fonte da aplicação
- Organizado seguindo princípios de arquitetura limpa

#### `prisma/`

- **ORM e Migrações**: Configurações do Prisma para banco de dados
- `schema.prisma`: Definição do esquema do banco de dados
- `seed.ts`: Script para popular o banco com dados iniciais
- `seeds/`: Diretório com scripts de seed específicos

#### `test/`

- **Testes automatizados** da aplicação
- Separados por contexto de módulos, contém os testes de integração da aplicação.

### 📁 Estrutura do Código Fonte (`src/`)

#### `main.ts`

- **Ponto de entrada** da aplicação
- Configuração do servidor NestJS, como definição de cors, trativa de erros não esperados e setup de documentação de rotas/

#### `app.module.ts`

- **Módulo raiz** da aplicação
- Configuração global e importação de outros módulos

#### `prisma.module.ts`

- **Módulo do Prisma** para integração com banco de dados

#### `core/` - Camada de Domínio

- **`domain/`**: Entidades e regras de negócio centrais
- **`protocols/`**: Interfaces e contratos da aplicação
- **`shared/`**: Componentes compartilhados entre módulos
- **`infra/`**: Implementações de infraestrutura

#### `modules/` - Módulos da Aplicação

- Cada módulo será separado por contexto e seguirá a arquitetura de camadas do NestJS

#### `shared/` - Componentes Compartilhados

- **`errors/`**: Tratamento centralizado de erros
- Utilitários e helpers reutilizáveis

#### `infra/` - Infraestrutura

- **`http/`**: Controllers e middlewares HTTP
- **`config/`**: Configurações e envs da aplicação
- **`db/`**: Configurações de banco de dados
- **`encryption/`**: Utilitários de criptografia

#### `models/` - Modelos de Dados

- Representações das tabelas do banco de dados.

### 📁 Arquivos de Configuração

#### `package.json`

- **Dependências** e scripts da aplicação
- **Scripts principais**:
  - `npm run docker:dev`: Ambiente Docker de desenvolvimento com hot-reload
  - `npm run start:dev`: Desenvolvimento com hot-reload
  - `npm run build`: Compilação para produção
  - `npm run test`: Execução de testes

#### `tsconfig.json` e `tsconfig.build.json`

- **Configurações do TypeScript**
- Opções de compilação e paths

#### `.eslintrc.js` e `eslint.config.js`

- **Regras de linting** para manter qualidade do código
- Configurações do ESLint

#### `.prettierrc`

- **Formatação automática** do código
- Configurações do Prettier

#### `.swcrc`

- **Configuração do SWC** para transpilação rápida
- Alternativa ao Babel para melhor performance

#### `jest.config.js` e `jest.setup.js`

- **Configuração dos testes** com Jest
- Setup global e configurações de cobertura

#### `nest-cli.json`

- **Configuração do CLI do NestJS**
- Opções de build e geração de código

### 📁 Docker e Infraestrutura

#### `Dockerfile` e `Dockerfile.dev`

- **Imagens Docker** para produção e desenvolvimento
- Configurações de containerização

#### `docker-compose.dev.yml` e `docker-compose.prod.yml`

- **Orquestração de containers** para diferentes ambientes
- Inclui PostgreSQL e a própria aplicação

#### `.dockerignore`

- Arquivos e diretórios excluídos do build Docker

### 📁 Configurações de Editor

#### `.editorconfig`

- **Configurações de editor** consistentes
- Garante formatação uniforme entre diferentes editores

#### `.gitignore`

- **Arquivos ignorados** pelo Git
- Exclui arquivos temporários e dependências

## Scripts NPM Disponíveis

### Desenvolvimento

- `npm run start:dev`: Inicia aplicação em modo desenvolvimento
- `npm run start:debug`: Modo debug com breakpoints
- `npm run format`: Formata código com Prettier
- `npm run lint`: Executa ESLint e corrige problemas

### Docker

- `npm run docker:dev`: Ambiente completo de desenvolvimento
- `npm run docker:prod`: Ambiente de produção
- `npm run docker:dev:infra`: Apenas infraestrutura (PostgreSQL)
- `npm run docker:dev:migrate`: Executa migrações do banco

### Testes

- `npm run test`: Executa todos os testes
- `npm run test:watch`: Modo watch para desenvolvimento
- `npm run test:cov`: Testes com relatório de cobertura
- `npm run test:e2e`: Testes end-to-end

### Banco de Dados

- `npm run seed`: Popula banco com dados iniciais
- `npm run prisma:migrate:local`: Migrações locais

## Arquitetura da Aplicação

O projeto segue os **princípios de Clean Architecture** com:

1. **Camada de Domínio** (`core/domain`): Regras de negócio centrais
2. **Camada de Aplicação** (`modules/`): Casos de uso e lógica de aplicação
3. **Camada de Infraestrutura** (`infra/`): Implementações técnicas
4. **Camada de Interface** (`modules/*/controllers`): Controllers HTTP

## Padrões de Desenvolvimento

- **Dependency Injection** via NestJS
- **Repository Pattern** para acesso a dados
- **DTOs** para validação de entrada
- **Interceptors** para transformação de resposta
- **Guards** para autenticação e autorização
- **Pipes** para validação e transformação
- **Adapter** para inversões de dependência

## Princípios aplicados

- **Single Responsibility Principle (SRP)**
- **Open Closed Principle**
- **Liskov Substitution Principle (LSP)**
- **Interface Segregation Principle (ISP)**
- **Dependency Inversion Principle (DIP)**
- **Separation of Concerns (SOC)**
- **Don't Repeat Yourself (DRY)**
- **Keep It Simple, Silly (KISS)**
- **You Aren't Gonna Need It (YAGNI)**

## Metodologias e Designs

- **Clean Architecture**
- **Modular design**
- **Use cases**
- **Conventional Commits**
- **Continuous Integration**
- **Continuous Delivery**
- **Continuous Deployment**

## Como Executar

### Pré-requisitos

- Node.js 20+
- Docker e Docker Compose
- PostgreSQL (via Docker)

### Desenvolvimento Local

```bash
# Instalar dependências
npm ci

# Configurar variáveis de ambiente
mv .env.development .env

# Executar com Docker
npm run docker:dev
```

### Produção

```bash
# Build e execução em produção
npm run docker:prod:build
```

## Estrutura de Testes

- **Testes Unitários**: Cada módulo tem seus testes
- **Testes E2E**: Testes de integração completos
- **Cobertura**: Relatórios de cobertura de código
- **Setup**: Configuração global de testes

## Monitoramento e Logs

- **Winston** para logging estruturado
- **CloudWatch** para monitoramento em produção
- **Health checks** via @nestjs/terminus

## Segurança

- **Rate limiting** via @nestjs/throttler
- **Validação** via class-validator
- **Criptografia** de senhas com bcrypt
- **JWT** para autenticação

Esta documentação fornece uma visão completa da estrutura e organização do projeto Profarma, facilitando o entendimento para novos desenvolvedores e a manutenção do código existente.

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

# Core Banking - API de Mudança de Senha

## Rota: PUT /account/change-password

### Descrição

Esta rota permite alterar a senha de um usuário autenticado no sistema core banking.

### Autenticação

- **Tipo**: Bearer Token
- **Header**: `Authorization: Bearer <token>`

### Headers Obrigatórios

- `Authorization`: Token JWT de autenticação do usuário
- `personid`: ID numérico da pessoa (extraído automaticamente do token de autenticação)

### Body da Requisição

```json
{
  "verifyTokenId": "123456",
  "password": "NovaSenha@123"
}
```

### Campos do Body

- `verifyTokenId` (string, obrigatório): Token de verificação SMS enviado para o telefone principal da pessoa
- `password` (string, obrigatório): Nova senha do usuário (mínimo 8 caracteres)

### Resposta de Sucesso (200)

```json
{
  "success": true
}
```

### Respostas de Erro

#### 400 - Dados Inválidos

```json
{
  "message": "Dados de entrada inválidos",
  "errors": [
    {
      "field": "password",
      "message": "password must be longer than or equal to 8 characters"
    }
  ]
}
```

#### 401 - Token de Verificação Inválido

```json
{
  "message": "Token de verificação inválido"
}
```

#### 404 - Pessoa Não Encontrada

```json
{
  "message": "Pessoa não encontrada"
}
```

#### 500 - Erro Interno

```json
{
  "message": "Erro interno do servidor"
}
```

### Fluxo da Operação

1. **Autenticação**: Valida o token Bearer e extrai o `personid`
2. **Busca da Pessoa**: Localiza a pessoa pelo ID fornecido
3. **Telefone Principal**: Obtém o telefone principal cadastrado da pessoa através do documento
4. **Validação SMS**: Verifica se o token SMS é válido para o telefone principal
5. **Criptografia**: Aplica hash bcrypt na nova senha (salt 10)
6. **Atualização**: Altera a senha do usuário no banco de dados
7. **Resposta**: Retorna confirmação de sucesso

### Segurança

- A nova senha é criptografada usando bcrypt com salt 10
- O token de verificação SMS é validado antes de qualquer alteração
- A rota requer autenticação JWT válida
- O personid é extraído automaticamente do token de autenticação

### Dependências

- **Repositórios**: PersonRepository, UserRepository
- **Serviços**: BcryptAdapter, SMSVerificationProvider
- **Middlewares**: UserAuthenticationMiddleware

### Exemplo de Uso

```bash
curl -X PUT \
  http://localhost:3000/account/change-password \
  -H 'Authorization: Bearer <seu-jwt-token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "verifyTokenId": "123456",
    "password": "MinhaNovaSenh@123"
  }'
```

### Códigos de Status HTTP

- `200`: Senha alterada com sucesso
- `400`: Dados inválidos fornecidos
- `401`: Token de autenticação ou verificação inválido
- `404`: Pessoa ou telefone não encontrado
- `500`: Erro interno do servidor

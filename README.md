<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Este es el repositorio de Nest con GraphqQl de Udemy con Fernando Herrera

# Prev
## Pasos Facil
  Primero clonar el archivo `.env.exmaple` y colocarlo en ```.env```
  - Luego configurar las variables de entorno que nos indica
  - Y solo ejecutar este comando ```sh init_project.sh``` que se encargaria de todo

## Pasos mas largos
  Primero clonar el archivo `.env.exmaple` y colocarlo en ```.env```
  - Luego configurar las variables de entorno que nos indica
  - Ejecutar ```docker compuse up -d```
  - Luego ```npm i```
  - Y ```npm run pg:run-mg```


# Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run dev

# production mode
$ npm run start:prod
```

# License

Carlos Diaz

## Librerias utilizada
- npm i @nestjs/graphql @nestjs/apollo graphql apollo-server-express
- npm i apollo-server-core
- npm i class-validator class-transformer
- npm i @nestjs/config
- npm i --save @nestjs/typeorm typeorm pg
- npm i joi
- npm i dotenv
- npm i bcrypt
- npm i --save @types/bcrypt
- npm i --save @nestjs/passport passport
- npm i --save @nestjs/jwt passport-jwt
- npm i --save-dev @types/passport-jwt
- npm i typeorm-extension --save
- npm i @faker-js/faker --save-dev
- npm install --save cron
- npm i selenium-webdriver
- npm i selenium-webdriver/chrome
- npm i --save-dev @types/selenium-webdriver
- npm i -g chromedriver --save

# TODO
Implementar la seed en NestJs

## Docker

``` docker build -t prueba . ```

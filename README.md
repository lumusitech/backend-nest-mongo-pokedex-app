# Pokedex App

<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo"/>
   </a>
</p>

## Development

1. After clone, run

   ```sh
   pnpm i
   ```

2. Install Nestjs cli:

   ```sh
   pnpm i -g @nestjs/cli
   ```

3. Get up database

   ```sh
   docker compose up -d
   ```

4. Start Dev server

   ```sh
   pnpm start:dev
   ```

5. Rebuild DB with SEED

   ```http
   http://localhost:3000/api/v2/seed
   ```

## Stack

- MongoDB
- Nest

## Dependencies

- [@nestjs/serve-static](https://www.npmjs.com/package/@nestjs/serve-static): @nestjs/serve-static package for Nest, useful to serve static content like Single Page Applications (SPA). However, if you are building MVC application or want to serve assets files (images, docs), use the useStaticAssets() method (read more here) instead.
- [@nestjs/mongoose](https://www.npmjs.com/package/@nestjs/mongoose): Mongoose module for Nest.
- [mongoose](https://www.npmjs.com/package/mongoose): Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.
- [class-transformer](https://www.npmjs.com/package/class-transformer): Its ES6 and Typescript era. Nowadays you are working with classes and constructor objects more than ever. Class-transformer allows you to transform plain object to some instance of class and versa. Also it allows to serialize / deserialize object based on criteria. This tool is super useful on both frontend and backend.
- [class-validator](https://www.npmjs.com/package/class-validator): Allows use of decorator and non-decorator based validation. Internally uses validator.js to perform validation. Class-validator works on both browser and node.js platforms.
- [axios](https://www.npmjs.com/package/axios): Axios es un Cliente HTTP basado en promesas para node.js y el navegador. Es isomorfico (= puede ejecutarse en el navegador y nodejs con el mismo código base). En el lado del servidor usa el modulo nativo http de node.js, mientras que en el lado del cliente (navegador) usa XMLHttpRequests.

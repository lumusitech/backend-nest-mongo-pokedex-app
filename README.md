<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Pokedex App

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

## Stack

- MongoDB
- Nest

## Dependencies

- [@nestjs/serve-static](https://www.npmjs.com/package/@nestjs/serve-static): @nestjs/serve-static package for Nest, useful to serve static content like Single Page Applications (SPA). However, if you are building MVC application or want to serve assets files (images, docs), use the useStaticAssets() method (read more here) instead.

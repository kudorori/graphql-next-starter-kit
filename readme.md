# GraphQL Next Starter Kit

> koa + next.js + graphql + passport + winston

## Usage

```
  $ git clone https://github.com/kudorori/graphql-next-starter-kit.git
  $ npm i
  $ npm run dev
```

## Ues Koa-Server Running
```
  $ npm run dev
  $ npm run build
  $ npm run start
```

## No Server Running

```
  $ npm run dev-client
  $ npm run build-client
  $ npm run start-client
```

## Unit test

```
  $ npm run test
```

### 目錄結構

```
./
├── client/                       # Client -----
│   ├── pages/                    # Next.js Pages
│   ├── components/               # Component & Container Dir
│   ├── libs/                     # Client Use Library
│   └── index.js                  # Listen Server
├── src/                          # Server -----
│   ├── resolvers/                # GraphQL Resolvers...
│   ├── typeDefs/                 # GraphQL typeDefs...
│   ├── models/                   # Data Model (Mongoose, Sequelizejs)
│   ├── middles/                  # Middlewares
│   ├── libs/                     # Server Util Libs
│   ├── client.js/                # Client Server build
│   ├── config.js/                # Server Config
│   └── index.js                  #
```

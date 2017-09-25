# GraphQL Next Starter Kit

> koa + next.js + graphql + passport + winston

## Usage

```
  $ git clone https://github.com/kudorori/graphql-next-starter-kit.git
  $ npm i
  $ npm run dev
```

## Client

> 保留Next.js本身的開發模式


## Server

> 以業務層為主進行模式化


### 目錄結構

```
./
├── client/
│   ├── front/                    #
│   │   ├── pages/                # Next.js Pages
│   │   ├── gql/                  # Query GQL Dir
│   │   ├── components/           # Component & Container Dir
│   │   ├── libs/                 # Client Use Library
│   │   └── index.js              # Listen Server
│   ├── admin/                    #
│   │   └── 同上/                  
│   ├── libs/                     # Client 端共用 Library (ln to other dir)
│   └── index.js
├── src/                          #
│   ├── modules/                  #
│   │   ├── [methodName]/         #
│   │   │   ├── resolvers/        #
│   │   │   ├── schema/           #
│   │   │   └── typeDefs.js       #
│   │   └── index.js              #
│   ├── middles/                  # 共用中間層
│   ├── libs/                     # Server端Libs
│   └── index.js                  #
```

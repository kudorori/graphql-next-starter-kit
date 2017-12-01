import fs from "fs";
import https from "https";
import http from "http";
import koa from "koa";
import koaBody from "koa-body";
import koaStatic from "koa-static";
import koaSession from "koa-session";
import koaPassport from "koa-passport";
import koaRouter from "koa-router";
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { graphqlKoa, graphiqlKoa } from 'graphql-server-koa';
import next from "next";

export default ({
  schema,
  models,
  middlewares,
  config
}) => {
  const { dev, root } = config;
  const app = next({ dir: __dirname, dev });
  const server = new koa();
  const router = new koaRouter();
  const handle = app.getRequestHandler();

  middlewares.forEach((middleware) => {
    server.use(middleware);
  })

  app.prepare().then(() => {

    router.post("/graphql", async (ctx, next) => graphqlKoa({
      schema,
      rootValue: {},
      context: ctx
    })(ctx, next))

    router.get('/graphql', (ctx, next) => graphiqlKoa({
      endpointURL: "/graphql",
      subscriptionsEndpoint: `ws://${ctx.headers.host}/subscriptions`
    })(ctx, next));

    router.get("*", async(ctx, next) => {
      await handle(ctx.req, ctx.res);
      ctx.respond = false;
    })

    server.use(koaBody({
        multipart: true,
        formidable:{
          uploadDir: `${root}/upload`
        },
        formLimit:"30mb",
        textLimit:"1mb"
    }));
    server.use(koaSession({
      key: 'koa:sess',
      maxAge: 86400000,
      overwrite: true,
      httpOnly: true,
      signed: true,
    }, server));
    server.use(koaPassport.initialize());
    server.use(koaPassport.session());
    server.use(router.routes());

    const httpServer = http.createServer(server.callback());
    httpServer.listen(8080, (err) => {
      console.log("listen 8080");
      new SubscriptionServer({
        schema: schema,
        subscribe,
        execute,
        onConnect: (params, socket) => {
          return new Promise((resolve) => {
            // verify user, resolve models & user state
            resolve({
              models
            })
          });
        },
        onDisconnect: (ws) => {

        }
      }, {
        server: httpServer,
        path: '/subscriptions',
      });
    })

  })
}

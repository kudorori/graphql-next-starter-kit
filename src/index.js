import * as config from "./config";
import logger from "./middles/logger";
import models from "./models";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import { makeExecutableSchema } from 'graphql-tools';
import client from "./client";

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

client({
  models,
  schema,
  config,
  middlewares: [
    logger
  ]
})

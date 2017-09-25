import { models, schema } from "./modules";
import client from "../client";
import { dev } from "../config";
import logger from "./middles/logger";

client({
  models,
  schema,
  dev,
  middlewares: [
    logger
  ]
})

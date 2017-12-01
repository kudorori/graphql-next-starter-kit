import { models, schema } from "./modules";
import client from "../client";
import * as config from "./config";
import logger from "./middles/logger";

client({
  models,
  schema,
  config,
  middlewares: [
    logger
  ]
})

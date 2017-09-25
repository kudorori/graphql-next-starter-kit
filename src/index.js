import { models, schema } from "./modules";
import client from "../client";
import { dev } from "./config";

client({
  models,
  schema,
  dev
})

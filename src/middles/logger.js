import logger from "../libs/logger";
import { dev } from "../config";
export default async (ctx, next) => {
  ctx.logger = logger;
  if(!dev){
    logger.info("entry");
  }
  try {
    await next();
  } catch(err) {
    logger.error(err.toString());
    throw err;
  }
}

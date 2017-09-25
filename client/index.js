import koaRouter from "koa-router";;
import admin from "./admin";
import front from "./front";
import R from "ramda";
export default R.applySpec([admin, front])

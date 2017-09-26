import R from "ramda";
import path from "path";
import impl from "import-directory";
import { makeExecutableSchema } from 'graphql-tools';
import mongoose from "mongoose";
import { mongo_host } from "../../config";

mongoose.connect(mongo_host, {
  useMongoClient: true
}, () => {
  console.log("mongoose connection to", mongo_host);
})

const modules = impl(module, __dirname, {

});

const models = R.pipe(
  R.map(R.pathOr({}, ["schema"])),
  R.mapObjIndexed((items, pKey) => R.mapObjIndexed((schema, key) => mongoose.model(`${pKey}_${key}`, schema, `${pKey}_${key}`, schema), items)),
  R.filter(R.pipe(
    R.isEmpty,
    R.not
  ))
)(modules);

const typeDefs = R.pipe(
  R.toPairs,
  R.map(R.pathOr("", [1, "typeDefs"])),
  R.filter(R.pipe(
    R.isEmpty,
    R.not
  )),
  R.join("\n")
)(modules);

const resolvers = R.pipe(
  R.toPairs,
  R.map(R.pathOr({}, [1, "resolvers"])),
  R.reduce(R.mergeDeepRight,{}),
)(modules)

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export {
  models,
  schema
}

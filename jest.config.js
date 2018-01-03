require("babel-core/register");
const resolvers = require("./src/resolvers").default;
const models = require("./src/models").default;
module.exports = {
  globals: {
    __TEST__: true,
    resolvers: resolvers,
    models: models
  }
}

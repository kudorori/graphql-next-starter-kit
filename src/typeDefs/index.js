import R from "ramda";
import impl from "import-directory";

const methods = impl(module, __dirname, {

});

const typeDefs = R.pipe(
  R.toPairs,
  R.map(R.pathOr("", [1])),
  R.filter(R.pipe(
    R.isEmpty,
    R.not
  )),
  R.join("\n")
)(methods);

export default /* GraphQL */`
  type Query {
    admin: String,
    me: String
  }
  type Mutation {
    admin: String,
    me: String
  }
  type Subscription {
    admin: String,
    me: String
  }
  ${typeDefs}
`

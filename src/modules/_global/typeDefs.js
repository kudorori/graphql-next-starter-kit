export default /* GraphQL */`
  type MeQuery {
    _default: String
  }
  type MeMutate {
    _default: String
  }
  type AdminQuery {
    _default: String
  }
  type AdminMutate {
    _default: String
  }

  type Query {
    me: MeQuery,
    admin: AdminQuery
  }
  type Mutation {
    me: MeMutate,
    admin: AdminMutate
  }
  type Subscription {
    _default: String
  }
`

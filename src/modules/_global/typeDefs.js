export default `
  type Query {
    me: MeQuery,
    admin: AdminQuery
  }
  type Mutation {
    me: MeMutate,
    admin: AdminMutate
  }
`

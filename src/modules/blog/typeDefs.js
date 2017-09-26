

export default /* GraphQL */`

  type BlogMe {
    title: String
  }
  extend type AdminQuery {
    searchBlog(
      limit: Int,
      skip: Int,
      q: String
    ): [String]
  }
  extend type MQuery {
    blog: BlogMe
  }
  extend type Query {
    me: Me
  }
  extend type Mutation {
    me: Me
  }
`



export default `

  type BlogMe {
    title: String
  }
  type Admin {
    searchBlog(
      limit: Int,
      skip: Int,
      q: String
    ): [String]
  }
  type Me {
    blog: BlogMe
  }
  type Query {
    me: Me
  }
  type Mutation {
    me: Me
  }
`

import { type as UserList} from "./schema/list";

export default /* GraphQL */`
  ${UserList}

  type UserMutate {
    updateProfile(
      username: String
    ) : UserList
  }
  type MeQuery {
    a: String
  }
  type MeMutate {
    user: UserMutate
  }
  type AdminQuery {
    a: String
  }
  type AdminMutate {
    a: String
  }

  type Query {
    searchUser(
      skip: Int,
      limit: Int,
      q: String
    ): [UserList]
  }
  type Subscription {
    listenUser: String
  }
`

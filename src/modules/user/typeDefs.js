import { type as UserList} from "./schema/list";

export default /* GraphQL */`
  ${UserList}

  type UserMutate {
    updateProfile(
      username: String
    ) : UserList
  }
  extend type MeQuery {
    a: String
  }
  extend type MeMutate {
    user: UserMutate
  }
  extend type AdminQuery {
    a: String
  }
  extend type AdminMutate {
    a: String
  }

  extend type Query {
    searchUser(
      skip: Int,
      limit: Int,
      q: String
    ): [UserList]
  }
  extend type Subscription {
    listenUser: String
  }
`

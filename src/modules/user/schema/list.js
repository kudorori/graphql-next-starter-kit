import { Schema } from "mongoose";
import createType from "mongoose2gql";
const schema = new Schema({
  username: String,
  password: String
})

export const type = createType({
  schema,
  name: "UserList",
  extend: () => ({
    UserList: {
      _test: "String"
    }
  })
})

export default schema;

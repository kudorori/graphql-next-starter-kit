import { Schema } from "mongoose";
import createType from "mongoose2gql";
const schema = new Schema({
  username: String,
  password: String
}, {
  timestamps: true
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

schema.index({username: 1}, {unique: true})

export default schema;

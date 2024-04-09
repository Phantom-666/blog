import mongoose, { Document, Schema } from "mongoose"
import { IPost, postSchema } from "./Posts"

export interface IUser extends Document {
  username: string
  email: string
  password: string
  image: string
  addName: string
  posts: IPost[]
}

const userSchema: Schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  addName: {
    type: String,
  },

  posts: {
    type: [postSchema],
    default: [],
  },
})

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema)

export default User

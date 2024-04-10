import mongoose, { Document, Schema } from "mongoose"
import { IPost, postSchema } from "./Posts"

export interface IUser extends Document {
  username: string
  email: string
  password: string
  image: string
  addName: string
  posts: IPost[]
  subscribers: mongoose.Schema.Types.ObjectId[]
  subscribedTo: mongoose.Schema.Types.ObjectId[]
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
  subscribers: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  subscribedTo: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
})

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema)

export default User

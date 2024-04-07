import mongoose, { Document, Schema } from "mongoose"

export interface IUser extends Document {
  username: string
  email: string
  password: string
  image: string
  addName: string
}

const userSchema: Schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
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
})

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema)

export default User

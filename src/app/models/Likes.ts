import mongoose, { Document, Schema } from "mongoose"

export interface ILikes extends Document {
  likes: number
  postId: mongoose.Schema.Types.ObjectId
  usersWhoLiked: mongoose.Schema.Types.ObjectId[]
}

const likesSchema: Schema = new mongoose.Schema({
  likes: { type: Number, default: 0 },
  postId: mongoose.Schema.Types.ObjectId,
  usersWhoLiked: { type: [mongoose.Schema.Types.ObjectId], default: [] },
})

const Likes =
  mongoose.models.Likes || mongoose.model<ILikes>("Likes", likesSchema)

export { likesSchema }

export default Likes

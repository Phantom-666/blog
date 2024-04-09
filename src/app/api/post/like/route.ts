import Likes from "@/app/models/Likes"
import User from "@/app/models/User"

export const POST = async (request: Request) => {
  const { postId, username } = await request.json()

  const likeSchema = await Likes.findOne({ postId })

  if (!likeSchema)
    return Response.json({ status: "No such post" }, { status: 400 })

  const user = await User.findOne({ username })
  if (!user) return Response.json({ status: "No such user" }, { status: 400 })

  const indexToDelete = likeSchema.usersWhoLiked.indexOf(user._id)

  if (indexToDelete !== -1) {
    likeSchema.likes -= 1
    likeSchema.usersWhoLiked.splice(indexToDelete, 1)
  } else {
    likeSchema.likes += 1
    likeSchema.usersWhoLiked.push(user._id)
  }

  await likeSchema.save()

  return Response.json({ counter: likeSchema.likes }, { status: 200 })
}

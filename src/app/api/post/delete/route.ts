import dbConnect from "@/app/lib/connectDb"
import Likes from "@/app/models/Likes"
import User from "@/app/models/User"

export const POST = async (request: Request) => {
  await dbConnect()
  const body = await request.json()

  const user = await User.findOne({
    username: body.username,
  })

  if (!user) return Response.json({ status: "No such user" }, { status: 400 })

  const newPosts = []

  for (let post of user.posts) {
    if (String(post._id) !== body.id) {
      newPosts.push(post)
    }
  }

  user.posts = newPosts

  //likes

  await Likes.deleteOne({ postId: body.id })

  await user.save()

  return Response.json({ status: "Deleted" })
}

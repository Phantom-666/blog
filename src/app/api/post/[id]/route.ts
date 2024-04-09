import dbConnect from "@/app/lib/connectDb"
import Likes from "@/app/models/Likes"
import User from "@/app/models/User"

export const GET = async (request: Request) => {
  await dbConnect()
  const splitted = request.url.split("/")

  const username = splitted[splitted.length - 1]

  const user = await User.findOne({ username })

  if (!user) return Response.json({ status: "No such user" }, { status: 400 })

  const likesArray = []
  for (let post of user.posts) {
    const likes = await Likes.findOne({ postId: post._id })

    likesArray.push(likes.likes)
  }

  return Response.json({ posts: user.posts, likesArray }, { status: 200 })
}

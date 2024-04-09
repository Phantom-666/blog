import { getSession } from "@/app/lib/auth"
import dbConnect from "@/app/lib/connectDb"
import Likes from "@/app/models/Likes"
import User from "@/app/models/User"

export const GET = async (request: Request) => {
  await dbConnect()
  const splitted = request.url.split("/")

  const session = await getSession()

  const mainUser = await User.findOne({ email: session.user.email })

  const mainUserId = mainUser._id

  const username = splitted[splitted.length - 1]

  //posts for page
  const user = await User.findOne({ username })

  if (!user) return Response.json({ status: "No such user" }, { status: 400 })

  const likedByYou = []

  const likesArray = []
  for (let post of user.posts) {
    const likes = await Likes.findOne({ postId: post._id })

    likesArray.push(likes.likes)

    const i = likes.usersWhoLiked.indexOf(mainUserId)

    likedByYou.push(i !== -1)
  }

  return Response.json(
    { posts: user.posts, likesArray, likedByYou },
    { status: 200 }
  )
}

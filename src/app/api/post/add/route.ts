import dbConnect from "@/app/lib/connectDb"
import Likes from "@/app/models/Likes"
import Post from "@/app/models/Posts"
import User from "@/app/models/User"

// adding post
export const POST = async (request: Request) => {
  await dbConnect()
  const data = await request.json()

  const user = await User.findOne({ email: data.email })

  const post = new Post({
    text: data.post,
  })

  const likes = new Likes({ postId: post._id })

  await likes.save()

  user.posts.unshift(post)

  await user.save()

  return Response.json({ status: "Successfully", post }, { status: 201 })
}

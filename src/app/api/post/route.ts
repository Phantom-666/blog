import dbConnect from "@/app/lib/connectDb"
import Post from "@/app/models/Posts"
import User from "@/app/models/User"

export const POST = async (request: Request) => {
  await dbConnect()
  const data = await request.json()

  const user = await User.findOne({ email: data.email })

  const post = new Post({
    text: data.post,
  })

  user.posts.unshift(post)

  await user.save()

  return Response.json({ status: "Successfully", post }, { status: 201 })
}

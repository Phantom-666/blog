import dbConnect from "@/app/lib/connectDb"
import User from "@/app/models/User"

export const GET = async (request: Request) => {
  await dbConnect()
  const splitted = request.url.split("/")

  const username = splitted[splitted.length - 1]

  const user = await User.findOne({ username })

  if (!user) return Response.json({ status: "No such user" }, { status: 400 })

  return Response.json({ posts: user.posts }, { status: 200 })
}

import dbConnect from "@/app/lib/connectDb"
import User from "@/app/models/User"

export const POST = async (request: Request) => {
  await dbConnect()
  const { input } = await request.json()

  const users = await User.find({
    username: { $regex: input, $options: "i" },
  }).select("username")

  return Response.json({ users }, { status: 200 })
}

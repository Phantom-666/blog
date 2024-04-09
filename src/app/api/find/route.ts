import User from "@/app/models/User"

export const POST = async (request: Request) => {
  const { input } = await request.json()

  const users = await User.find({
    username: { $regex: input, $options: "i" },
  }).select("username")

  return Response.json({ users }, { status: 200 })
}

import User from "@/app/models/User"

export const GET = async (request: Request) => {
  const splitted = request.url.split("/")
  const username = splitted[splitted.length - 1]

  const user = await User.findOne({ username }).select(
    "username image addName email"
  )

  if (!user) return Response.json({ status: "No such user" }, { status: 400 })

  return Response.json({ user }, { status: 200 })
}

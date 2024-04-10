import dbConnect from "@/app/lib/connectDb"
import User from "@/app/models/User"

export const GET = async (request: Request) => {
  await dbConnect()
  const splitted = request.url.split("/")
  const username = splitted[splitted.length - 1]

  const user = await User.findOne({ username }).select(
    "username image addName email subscribers subscribedTo"
  )

  if (!user) return Response.json({ status: "No such user" }, { status: 400 })

  const subs = []
  const subscribedTo = []

  for (let id of user.subscribers) {
    const sub = await User.findById(id)

    subs.push(sub.username)
  }

  for (let id of user.subscribedTo) {
    const sub = await User.findById(id)
    subscribedTo.push(sub.username)
  }

  return Response.json({ user, subs, subscribedTo }, { status: 200 })
}

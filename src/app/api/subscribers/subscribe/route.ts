import { getSession } from "@/app/lib/auth"
import dbConnect from "@/app/lib/connectDb"
import User from "@/app/models/User"

export const POST = async (request: Request) => {
  await dbConnect()
  const session = await getSession()

  const { username } = await request.json()

  const user = await User.findOne({ username })

  if (!user) return Response.json({ status: "No such user" }, { status: 400 })

  const mainUser = await User.findOne({ username: session.user.username })
  if (!mainUser)
    return Response.json({ status: "No such user" }, { status: 400 })

  const index = user.subscribers.indexOf(mainUser._id)

  if (index === -1) {
    //subscribe
    user.subscribers.push(mainUser._id)
    mainUser.subscribedTo.push(user._id)
  } else {
    user.subscribers.splice(index, 1)
    mainUser.subscribedTo.splice(index, 1)
  }

  const subscribers = []
  const subscribedTo = []

  for (let sub of user.subscribers) {
    const newUser = await User.findById(sub)
    subscribers.push(newUser.username)
  }

  for (let sub of mainUser.subscribedTo) {
    const newUser = await User.findById(sub)
    subscribedTo.push(newUser.username)
  }

  await user.save()
  await mainUser.save()

  return Response.json({ subscribers, subscribedTo }, { status: 200 })
}

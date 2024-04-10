import { getSession } from "@/app/lib/auth"
import User from "@/app/models/User"

export const GET = async () => {
  const session = await getSession()

  const subscribers = await User.findOne({
    username: session.user.username,
  }).select("subscribers subscribedTo")

  const newSubscribers = []
  const subscribedTo = []

  for (let sub of subscribers.subscribers) {
    const subUser = await User.findById(sub)

    newSubscribers.push(subUser.username)
  }

  for (let sub of subscribers.subscribedTo) {
    const subUser = await User.findById(sub)

    subscribedTo.push(subUser.username)
  }

  return Response.json(
    { subs: { subscribers: newSubscribers, subscribedTo } },
    { status: 200 }
  )
}

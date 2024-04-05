import dbConnect from "@/app/lib/connectDb"
import User from "@/app/models/User"

type userType = {
  email: string
  password: string
}

export async function POST(request: Request) {
  await dbConnect()

  const data: userType = await request.json()

  const user = await User.findOne(data)

  if (!user) {
    return Response.json({ error: "No such user" }, { status: 400 })
  }

  // send token

  return Response.json(
    { username: user.username, email: user.email },
    { status: 200 }
  )
}

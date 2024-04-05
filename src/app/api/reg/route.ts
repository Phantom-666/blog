import dbConnect from "@/app/lib/connectDb"
import User from "@/app/models/User"

type userType = {
  username: string
  password: string
  email: string
}

export async function POST(request: Request) {
  await dbConnect()

  const data: userType = await request.json()

  if (!data.username) {
    return Response.json({ error: "No username" }, { status: 400 })
  }
  if (!data.email) {
    return Response.json({ error: "No email" }, { status: 400 })
  }

  if (!data.password) {
    return Response.json({ error: "No password" }, { status: 400 })
  }

  await User.create({
    username: data.username,
    email: data.email,
    password: data.password,
  })

  return Response.json({ status: "Check your email" }, { status: 201 })
}

import { UserTypeWithEmail } from "@/app/db/types"
import db from "../../db/db"

export async function POST(request: Request) {
  await db.connect()
  const data: UserTypeWithEmail = await request.json()
  const user = await db.findOne(data)

  if (!user) {
    return Response.json({ error: "No such user" }, { status: 400 })
  }

  // sending token
  return Response.json(
    {
      username: user.username,
      email: user.email,
      image: user.image,
      addName: user.addName,
    },
    { status: 200 }
  )
}

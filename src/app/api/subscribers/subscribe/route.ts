import { getSession } from "@/app/lib/auth"
import db from "@/app/db/db"

export const POST = async (request: Request) => {
  try {
    await db.connect()

    const session = await getSession()
    const { username } = await request.json()

    const response = await db.subscribeTo(username, session.user.username)

    return Response.json(response, { status: 200 })
  } catch (error: any) {
    return Response.json({ status: error.message }, { status: 400 })
  }
}

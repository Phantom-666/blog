import db from "../../../db/db"
import { getSession } from "@/app/lib/auth"

export const POST = async (request: Request) => {
  try {
    await db.connect()
    const body = await request.json()
    const session = await getSession()

    await db.deletePost(session.user.username, body.id)

    return Response.json({ status: "Deleted" }, { status: 200 })
  } catch (error: any) {
    Response.json({ status: error.message }, { status: 400 })
  }
}

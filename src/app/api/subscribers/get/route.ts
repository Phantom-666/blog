import { getSession } from "@/app/lib/auth"
import db from "@/app/db/db"

export const GET = async () => {
  const session = await getSession()
  const response = await db.getMySubscribers(session.user.username)

  return Response.json(response, { status: 200 })
}

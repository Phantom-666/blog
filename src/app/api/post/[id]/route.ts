import { getSession } from "@/app/lib/auth"

import db from "../../../db/db"

export const GET = async (request: Request) => {
  try {
    await db.connect()
    const splitted = request.url.split("/")
    const username = splitted[splitted.length - 1]

    const session = await getSession()
    const sessionEmail = session.user.email

    const posts = await db.fetchPosts(username, sessionEmail)

    return Response.json(posts, { status: 200 })
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 400 })
  }
}

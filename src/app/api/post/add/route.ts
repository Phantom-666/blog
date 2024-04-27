// import Likes from "@/app/models/Likes"
// import Post from "@/app/models/Posts"
// import User from "@/app/models/User"
import { getSession } from "@/app/lib/auth"
import db from "../../../db/db"

// adding post
export const POST = async (request: Request) => {
  try {
    await db.connect()
    const data = await request.json()
    const session = await getSession()

    const post = await db.addPost(session.user.email, data.post)

    return Response.json({ status: "Successfully", post }, { status: 201 })
  } catch (error) {
    return Response.json({ status: "No such user" }, { status: 400 })
  }
}

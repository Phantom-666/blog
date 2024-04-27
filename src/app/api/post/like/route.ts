import db from "../../../db/db"

export const POST = async (request: Request) => {
  try {
    await db.connect()
    const { postId, username } = await request.json()
    const response = await db.likePost(username, postId)

    return Response.json(response, { status: 200 })
  } catch (error: any) {
    return Response.json({ status: error.message }, { status: 400 })
  }
}

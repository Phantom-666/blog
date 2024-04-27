import db from "../../db/db"

export const POST = async (request: Request) => {
  await db.connect()
  const { input } = await request.json()

  const users = await db.findUsersByUsername(input)

  return Response.json({ users }, { status: 200 })
}

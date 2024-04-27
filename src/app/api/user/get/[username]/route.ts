import db from "@/app/db/db"

export const GET = async (request: Request) => {
  try {
    await db.connect()

    const splitted = request.url.split("/")
    const username = splitted[splitted.length - 1]
    const response = await db.getSubscribers(username)

    return Response.json(response, { status: 200 })
  } catch (error: any) {
    return Response.json({ status: error.message }, { status: 400 })
  }
}

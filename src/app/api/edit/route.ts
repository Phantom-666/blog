import { FormType, UserTypeWithEmail } from "@/app/db/types"
import db from "../../db/db"

export const POST = async (request: Request) => {
  await db.connect()
  const body = await request.json()
  const data: UserTypeWithEmail = { email: body.session.user.email }
  const { form }: { form: FormType } = body

  const { status, error, response } = await db.editUser(form, data)

  if (status) {
    return Response.json(response, { status: 200 })
  }

  return Response.json({ status: error }, { status: 400 })
}

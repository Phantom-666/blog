import dbConnect from "@/app/lib/connectDb"
import User from "@/app/models/User"

export const POST = async (request: Request) => {
  await dbConnect()
  const body = await request.json()

  const user = await User.findOne({ email: body.session.user.email })

  const {
    form,
  }: {
    form: { username: string; image: string; password: string; addName: string }
  } = body

  let status = false

  //username
  if (form.username !== user.username) {
    status = true

    if (form.username.trim().split(" ").length > 1) {
      return Response.json(
        { status: "Username cannot contain spaces" },
        { status: 400 }
      )
    }

    user.username = form.username.toLowerCase()
  }

  //addName

  if (form.addName !== "" && form.addName !== user.addName) {
    status = true
    user.addName = form.addName
  }

  //image

  if (form.image !== "" && form.image !== user.image) {
    status = true
    user.image = form.image
  }

  //password
  if (form.password !== "" && form.password !== user.password) {
    status = true
    user.password = form.password
  }

  if (status) {
    await user.save()
    return Response.json(
      {
        status: "Successfully changed",
        user: {
          username: user.username,
          addName: user.addName,
          image: user.image,
          email: user.email,
        },
      },
      { status: 200 }
    )
  }

  return Response.json({ status: "Nothing to change" }, { status: 400 })
}

"use server"
import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"

const secretKey = process.env.JWT_KEY
const key = new TextEncoder().encode(secretKey)

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .sign(key)
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  })
  return payload
}

type IUserData = {
  email: string
  username: string
}

export async function login(data: IUserData) {
  const user = { email: data.email, username: data.username }

  //   const expires = new Date(Date.now() + 10 * 1000)
  const session = await encrypt({ user })

  cookies().set("session", session, { httpOnly: true })
}

export async function logout() {
  cookies().set("session", "", { expires: new Date(0) })
}

export async function getSession() {
  const session = cookies().get("session")?.value
  if (!session) return null
  return await decrypt(session)
}

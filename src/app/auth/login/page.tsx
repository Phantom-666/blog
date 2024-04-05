"use client"
import { login } from "@/app/lib/auth"
import { loginAction } from "@/app/redux/login/loginActions"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useDispatch } from "react-redux"

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" })
  const [regStatus, setRegStatus] = useState<string | null>(null)
  const [regError, setRegError] = useState<string | null>(null)

  const emailFormHandle = (email: string) => {
    setForm((prev) => ({ ...prev, email }))
  }
  const passwordFormHandle = (password: string) => {
    setForm((prev) => ({ ...prev, password }))
  }

  const { push } = useRouter()

  const dispath = useDispatch()

  const fetchLogin = async () => {
    try {
      setRegStatus(null)
      setRegError(null)

      const res = await axios.post("/api/login", form)

      setRegStatus(res.data.status)

      const obj = { email: res.data.email, username: res.data.username }

      login(obj)
      dispath(loginAction(obj))

      push("/")
    } catch (err: any) {
      setRegError(err.response.data.error)
    }
  }

  return (
    <>
      <div
        className="
        bg-gray-200
        h-screen
        flex
        justify-center
        items-center"
      >
        <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                Email
              </label>
              <input
                value={form.email}
                onChange={(e) => emailFormHandle(e.target.value)}
                type="email"
                id="email"
                name="email"
                className="border border-gray-400 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                Password
              </label>
              <input
                value={form.password}
                onChange={(e) => passwordFormHandle(e.target.value)}
                type="password"
                id="password"
                name="password"
                className="border border-gray-400 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            {regStatus || regError ? (
              <div
                className={
                  "mb-2 " + (regStatus ? "text-green-600" : "text-red-600")
                }
              >
                <p>{regStatus ? regStatus : regError}</p>
              </div>
            ) : (
              <></>
            )}
            <button
              onClick={fetchLogin}
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login

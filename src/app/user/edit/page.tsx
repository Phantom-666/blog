"use client"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/app/redux"
import { Spinner } from "@radix-ui/themes"
import axios from "axios"
import { getSession, updateSession } from "@/app/lib/auth"
import { updateActions } from "@/app/redux/login/loginActions"

const Edit = () => {
  const user = useSelector((state: RootState) => state.user)

  const [editStatus, setEditStatus] = useState<string | null>(null)
  const [editError, setEditError] = useState<string | null>(null)

  const dispatch = useDispatch()

  const [form, setForm] = useState({
    username: "",
    image: "",
    password: "",
    addName: "",
  })

  useEffect(() => {
    if (user.username) {
      setForm((prev) => ({
        ...prev,
        addName: user.addName ? user.addName : "",
        username: user.username,
        image: user.image ? user.image : "",
        password: "",
      }))
    }
  }, [user])

  const editUser = async () => {
    const session = await getSession()

    try {
      const res = await axios.post("/api/edit", { form, session })

      setEditStatus(res.data.status)
      updateSession(res.data.user)
      dispatch(updateActions(res.data.user))
    } catch (error: any) {
      setEditError(error.response.data.status)
      console.log("error", error)
    }
  }

  if (user.username) {
    return (
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Edit Page</h1>
        <div className="space-y-4">
          <div>
            <label className="block mb-1">Name:</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={form.username}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, username: e.target.value }))
              }
            />
          </div>
          <div>
            <label className="block mb-1">Additional name:</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={form.addName}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, addName: e.target.value }))
              }
            />
          </div>
          <div>
            <label className="block mb-1">Image:</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={form.image}
              onChange={(e) => {
                setForm((prev) => ({ ...prev, image: e.target.value }))
              }}
            />
          </div>
          <div>
            <label className="block mb-1">Password:</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={form.password}
              name="new-pass"
              type="password"
              onChange={(e) =>
                setForm((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </div>

          {(editStatus || editError) && (
            <div className={editStatus ? "text-green-600" : "text-red-600"}>
              {editStatus || editError}
            </div>
          )}
          <button
            onClick={editUser}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center mt-5">
      <Spinner />
    </div>
  )
}

export default Edit

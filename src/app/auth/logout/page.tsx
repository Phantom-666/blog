"use client"

import { logout } from "@/app/lib/auth"
import { logoutActions } from "@/app/redux/login/loginActions"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const Logout = () => {
  const dispath = useDispatch()

  const { push } = useRouter()
  useEffect(() => {
    logout()
      .then(() => dispath(logoutActions()))
      .then(() => push("/"))
      .catch((err) => console.log("err", err))
  }, [])
  return <></>
}

export default Logout

"use client"
import { LOGIN, LOGOUT } from "./loginTypes"

const loginAction = (payload: any) => {
  return {
    type: LOGIN,
    payload,
  }
}

const logoutActions = () => {
  return { type: LOGOUT }
}

export { loginAction, logoutActions }

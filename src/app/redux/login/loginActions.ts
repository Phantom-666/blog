"use client"
import { LOGIN, LOGOUT, UPDATE_STATE } from "./loginTypes"

const loginAction = (payload: any) => {
  return {
    type: LOGIN,
    payload,
  }
}

const logoutActions = () => {
  return { type: LOGOUT }
}

const updateActions = (payload: any) => {
  return {
    type: UPDATE_STATE,
    payload,
  }
}

export { loginAction, logoutActions, updateActions }

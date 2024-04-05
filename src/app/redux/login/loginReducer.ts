"use client"
import { LOGIN, LOGOUT } from "./loginTypes"

const initialState = { username: null, email: null, isAuthorized: false }

const loginReducer = (
  state = initialState,
  actions: { type: string; payload?: any }
) => {
  switch (actions.type) {
    case LOGIN: {
      return {
        username: actions.payload.username,
        email: actions.payload.email,
        isAuthorized: true,
      }
    }

    case LOGOUT: {
      return { username: null, email: null, isAuthorized: false }
    }
    default:
      return state
  }
}

export default loginReducer

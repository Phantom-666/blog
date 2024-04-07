"use client"
import { LOGIN, LOGOUT, UPDATE_STATE } from "./loginTypes"

const initialState = {
  username: null,
  email: null,
  isAuthorized: false,
  image: null,
  addName: null,
}

const loginReducer = (
  state = initialState,
  actions: { type: string; payload?: any }
) => {
  switch (actions.type) {
    case LOGIN: {
      return {
        username: actions.payload.username,
        email: actions.payload.email,
        image: actions.payload.image,
        addName: actions.payload.addName,
        isAuthorized: true,
      }
    }

    case LOGOUT: {
      return {
        username: null,
        addName: null,
        image: null,
        email: null,
        isAuthorized: false,
      }
    }

    case UPDATE_STATE: {
      return {
        ...state,
        username: actions.payload.username,
        email: actions.payload.email,
        image: actions.payload.image,
        addName: actions.payload.addName,
      }
    }
    default:
      return state
  }
}

export default loginReducer

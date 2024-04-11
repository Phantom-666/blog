"use client"
import { configureStore } from "@reduxjs/toolkit"
import loginReducer from "./login/loginReducer"
import postsReducer from "./posts/postsReducer"

const store = configureStore({
  reducer: { user: loginReducer, posts: postsReducer },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export { store }

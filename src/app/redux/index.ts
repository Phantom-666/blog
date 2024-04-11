"use client"
import { combineReducers, configureStore, createStore } from "@reduxjs/toolkit"
import loginReducer from "./login/loginReducer"
import postsReducer from "./posts/postsReducer"

// const rootReducer = combineReducers({
//   user: loginReducer,
// })

// const store = createStore(rootReducer)

const store = configureStore({
  reducer: { user: loginReducer, posts: postsReducer },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export { store }

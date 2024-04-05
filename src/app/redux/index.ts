"use client"
import { combineReducers, configureStore, createStore } from "@reduxjs/toolkit"
import loginReducer from "./login/loginReducer"

// const store = configureStore({ reducer: { user: loginReducer } })

const rootReducer = combineReducers({
  user: loginReducer,
})

const store = createStore(rootReducer)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export { store }

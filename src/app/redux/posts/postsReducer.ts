import { SET_POSTS } from "./postsTypes"

const initialState = { posts: [] }

const postsReducer = (
  state = initialState,
  actions: {
    type: string
    payload?: any
  }
) => {
  switch (actions.type) {
    case SET_POSTS: {
      return {
        posts: actions.payload.posts,
      }
    }
    default:
      return state
  }
}

export default postsReducer

import { PostType } from "./postsActions"
import { ADD_POST, DELETE_POST, LIKE_POST, SET_POSTS } from "./postsTypes"

const initialState: { posts: PostType[] } = { posts: [] }

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

    case ADD_POST: {
      return {
        posts: [actions.payload.post, ...state.posts],
      }
    }
    case DELETE_POST: {
      const newState = state.posts.filter(
        (p: PostType) => p._id !== actions.payload.id
      )

      return {
        posts: newState,
      }
    }

    case LIKE_POST: {
      const newPosts = state.posts.map((p) => {
        if (p._id === actions.payload.id) {
          return {
            ...p,
            likes: actions.payload.counter,
            likedByYou: actions.payload.likedByYou,
          }
        }

        return p
      })

      return { posts: newPosts }
    }
    default:
      return state
  }
}

export default postsReducer

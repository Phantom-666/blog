import { ObserverType } from "./observerActions"
import { LIKE_POST, SET_OBSERVER, SET_POSTS, SUBSCRIBE } from "./observerTypes"
import { PostType } from "../posts/postsActions"

const initialState: ObserverType = {
  _id: null,
  addName: null,
  email: null,
  image: null,
  subLength: 0,
  subscribedTo: [],
  subscribers: [],
  username: null,
  posts: [],
}

const observerReducer = (
  state = initialState,
  actions: { type: string; payload?: any }
) => {
  switch (actions.type) {
    case SET_OBSERVER: {
      return actions.payload.observer
    }

    case SUBSCRIBE: {
      return { ...state, subscribers: actions.payload.subscribers }
    }

    case SET_POSTS: {
      return { ...state, posts: actions.payload.posts }
    }
    case LIKE_POST: {
      return {
        ...state,
        posts: state.posts.map((p, i) => {
          if (actions.payload.id === p._id) {
            return {
              ...p,
              likes: actions.payload.counter,
              likedByYou: actions.payload.likedByYou,
            }
          }
          return p
        }),
      }
    }

    default:
      return state
  }
}

export default observerReducer

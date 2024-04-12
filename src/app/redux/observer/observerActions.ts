import { PostType } from "../posts/postsActions"
import { LIKE_POST, SET_OBSERVER, SET_POSTS, SUBSCRIBE } from "./observerTypes"

export type ObserverType = {
  _id: string | null
  addName: string | null
  email: string | null
  image: string | null
  subLength: number
  subscribedTo: string[]
  subscribers: string[]
  username: string | null
  posts: PostType[]
}

const setObserver = (payload: { observer: ObserverType }) => {
  return { type: SET_OBSERVER, payload }
}

const subscribeToObserver = (payload: { subscribers: string[] }) => {
  return { type: SUBSCRIBE, payload }
}

const setPosts = (payload: { posts: PostType[] }) => {
  return { type: SET_POSTS, payload }
}

const likePostRedux = (payload: {
  id: string
  counter: number
  likedByYou: boolean
}) => {
  return { type: LIKE_POST, payload }
}

export { setObserver, subscribeToObserver, setPosts, likePostRedux }

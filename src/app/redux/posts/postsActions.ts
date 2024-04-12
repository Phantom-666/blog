import { ADD_POST, DELETE_POST, LIKE_POST, SET_POSTS } from "./postsTypes"

export type PostType = {
  _id: string
  createdAt: string
  likedByYou: boolean
  likes: number
  text: string
}

export type SubscribersType = {
  subscribers: string[]
  subscribedTo: string[]
  length: number
}

type Payload = {
  posts: PostType[]
}

const setPosts = (payload: Payload) => {
  return { type: SET_POSTS, payload }
}

const addPostRedux = (payload: { post: PostType }) => {
  return { type: ADD_POST, payload }
}
const deletePostRedux = (payload: { id: string }) => {
  return { type: DELETE_POST, payload }
}
const likePostRedux = (payload: {
  id: string
  counter: number
  likedByYou: boolean
}) => {
  return { type: LIKE_POST, payload }
}

export { setPosts, addPostRedux, deletePostRedux, likePostRedux }

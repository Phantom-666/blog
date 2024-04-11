import { SET_POSTS } from "./postsTypes"

export type Post = {}

const setPosts = (payload: Post[]) => {
  return { type: SET_POSTS, payload }
}

export { setPosts }

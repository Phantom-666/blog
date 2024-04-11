import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux"
import { deletePostRedux, likePostRedux } from "../redux/posts/postsActions"

type PostProps = {
  text: string
  createdAt: string
  _id: string
  likes: number
  index: number
  likedByYou: boolean
}

const Post = (props: PostProps) => {
  const dispatch = useDispatch()

  const username = useSelector((state: RootState) => state.user.username)

  const deletePost = async () => {
    try {
      await axios.post("/api/post/delete", {
        id: props._id,
        username,
      })

      dispatch(deletePostRedux({ id: props._id }))
    } catch (error) {
      console.log("error", error)
    }
  }

  const { text, createdAt } = props

  const likePost = async () => {
    const res = await axios.post("/api/post/like", {
      username,
      postId: props._id,
    })

    dispatch(
      likePostRedux({
        id: props._id,
        index: props.index,
        counter: res.data.counter,
        likedByYou: res.data.likedByYou,
      })
    )
  }

  return (
    <div className="border-b border-t border-gray-200 py-4 relative px-3">
      <button
        onClick={deletePost}
        className="absolute top-1 right-0 text-red-500 hover:text-red-700"
      >
        Delete
      </button>
      <p className="text-lg mt-2">{text}</p>
      <p className="text-xs mt-3">{createdAt}</p>
      <div className="items-center mt-2">
        <button
          onClick={likePost}
          className={
            props.likedByYou
              ? "text-blue-500 hover:text-red-600"
              : "text-gray-500 hover:text-blue-500"
          }
        >
          {props.likes} Like
        </button>
      </div>
    </div>
  )
}

export default Post

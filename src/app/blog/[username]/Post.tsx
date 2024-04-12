import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux"
import { likePostRedux } from "@/app/redux/observer/observerActions"

type PostProps = {
  text: string
  createdAt: string
  _id: string
  likes: number
  index: number
  likedByYou: boolean
}

const Post = (props: PostProps) => {
  const username = useSelector((state: RootState) => state.user.username)

  const { text, createdAt } = props

  const dispatch = useDispatch()

  const likePost = async () => {
    try {
      const res = await axios.post("/api/post/like", {
        username,
        postId: props._id,
      })

      dispatch(
        likePostRedux({
          id: props._id,
          counter: res.data.counter,
          likedByYou: res.data.likedByYou,
        })
      )
    } catch (error) {
      console.log("error", error)
    }
  }

  return (
    <div className="border-b border-t border-gray-200 py-4 relative px-3">
      <p className="text-lg">{text}</p>
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

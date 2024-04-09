import axios from "axios"
import { useSelector } from "react-redux"
import { RootState } from "../../redux"

type PostProps = {
  text: string
  createdAt: string
  _id: string
  setFetchedPosts: any
  likes: number
  index: number
  likedByYou: boolean
}

const Post = (props: PostProps) => {
  const username = useSelector((state: RootState) => state.user.username)

  const { text, createdAt } = props

  const likePost = async () => {
    const res = await axios.post("/api/post/like", {
      username,
      postId: props._id,
    })

    props.setFetchedPosts((prev: any) => {
      prev[props.index].likes = res.data.counter

      prev[props.index].likedByYou = res.data.likedByYou

      return [...prev]
    })
  }

  return (
    <div className="border-b border-gray-200 py-4 relative">
      <p>{text}</p>
      <br />
      <p>{createdAt}</p>
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

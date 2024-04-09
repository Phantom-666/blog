import axios from "axios"
import { useSelector } from "react-redux"
import { RootState } from "../redux"

type PostProps = {
  text: string
  createdAt: string
  _id: string
  setFetchedPosts: any
}

const Post = (props: PostProps) => {
  const username = useSelector((state: RootState) => state.user.username)

  const deletePost = async () => {
    const res = await axios.post("/api/post/delete", {
      id: props._id,
      username,
    })

    console.log("res", res.data)

    props.setFetchedPosts((prev: any) =>
      prev.filter((p: any) => p._id !== props._id)
    )
  }

  const { text, createdAt } = props

  return (
    <div className="border-b border-gray-200 py-4 relative">
      <button
        onClick={deletePost}
        className="absolute top-0 right-0 text-red-500 hover:text-red-700"
      >
        Delete
      </button>
      <p>{text}</p>
      <br />
      <p>{createdAt}</p>
      <div className="items-center mt-2">
        <button className="text-gray-500 hover:text-blue-500">0 Like</button>
        <button className="text-gray-500 hover:text-blue-500 ml-5">
          Comment
        </button>
        <button className="text-gray-500 hover:text-blue-500 ml-5">
          Share
        </button>
      </div>
    </div>
  )
}

export default Post

"use client"

import { useSelector } from "react-redux"
import { RootState } from "../redux"
import { Suspense, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import Post from "./Post"

const EditButton = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 text-white cursor-pointer"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 12a2 2 0 100-4 2 2 0 000 4z"
      clipRule="evenodd"
    />
    <path
      fillRule="evenodd"
      d="M3.586 15.414a2 2 0 010-2.828l12-12a2 2 0 012.828 2.828l-12 12a2 2 0 01-2.828 0z"
      clipRule="evenodd"
    />
  </svg>
)

type ProfileProps = {
  username: string
  profileImage: string | null
  addName: string | null
}

const ProfileComponent = ({
  username,
  profileImage,
  addName,
}: ProfileProps) => {
  const [isHovered, setIsHovered] = useState(false)

  const { push } = useRouter()

  return (
    <section className="bg-cover bg-center bg-no-repeat bg-gradient-to-b from-blue-700 to-blue-900 py-24 px-4 text-white">
      <div className="container mx-auto text-center">
        <img
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          src={
            profileImage
              ? profileImage
              : "https://catherineasquithgallery.com/uploads/posts/2023-01/1674279507_catherineasquithgallery-com-p-kartinka-fonovaya-seraya-foto-124.jpg"
          }
          alt="Profile Picture"
          className="rounded-full w-32 h-32 mx-auto border-4 border-white shadow-lg hover:cursor-pointer"
          onClick={() => push("/user/edit")}
        />
        <div className="relative inline-block">
          <h2
            className="text-3xl font-bold mt-4 inline-block hover:cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => push("/user/edit")}
          >
            {username}
          </h2>
          {isHovered && <EditButton />}
        </div>
        <p className="text-lg">{addName ? addName : "User"}</p>
      </div>
    </section>
  )
}

const FriendList = () => {
  return (
    <div className="col-span-1">
      <div className="bg-white p-4 shadow rounded">
        <h3 className="text-lg font-semibold mb-4">Friends</h3>
        <ul>
          <li className="flex items-center space-x-2">
            <img
              src="https://via.placeholder.com/50"
              alt="Friend"
              className="w-10 h-10 rounded-full"
            />
            <span className="font-semibold">Friend Name</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

const AddPost = ({
  email,
  setFetchedPosts,
}: {
  email: string
  setFetchedPosts: any
}) => {
  const [post, setPost] = useState("")

  const addPost = async () => {
    try {
      const res = await axios.post("/api/post/add", { email, post })

      setPost("")

      res.data.post.likes = 0

      setFetchedPosts((prev: any) => [res.data.post, ...prev])
    } catch (error) {
      console.log("error", error)
    }
  }

  return (
    <div>
      <textarea
        value={post}
        className="w-full h-24 resize-none border rounded-md p-2 mb-4"
        placeholder="What's on your mind?"
        onChange={(e) => setPost(e.target.value)}
      ></textarea>
      <button
        onClick={addPost}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Post
      </button>
    </div>
  )
}

const fetchPosts = async (username: string, setFetchedPosts: any) => {
  const res = await axios.get(`/api/post/${username}`)

  for (let i = 0; i < res.data.posts.length; ++i) {
    res.data.posts[i].likes = res.data.likesArray[i]
    res.data.posts[i].likedByYou = res.data.likedByYou[i]
  }

  setFetchedPosts(res.data.posts)
}

const Posts = ({
  username,
  fetchedPosts,
  setFetchedPosts,
}: {
  username: string
  fetchedPosts: any
  setFetchedPosts: any
}) => {
  useEffect(() => {
    if (username) {
      fetchPosts(username, setFetchedPosts)
    }
  }, [username])

  return (
    <div className="mt-4">
      {fetchedPosts.map((p: any, index: number) => (
        <Post
          {...p}
          key={index}
          index={index}
          setFetchedPosts={setFetchedPosts}
        />
      ))}
    </div>
  )
}

const BlogPosts = ({
  email,
  username,
}: {
  email: string
  username: string
}) => {
  const [fetchedPosts, setFetchedPosts] = useState([])

  return (
    <>
      <AddPost email={email} setFetchedPosts={setFetchedPosts} />
      <Suspense fallback={<div>Loading...</div>}>
        <Posts
          fetchedPosts={fetchedPosts}
          setFetchedPosts={setFetchedPosts}
          username={username}
        />
      </Suspense>
    </>
  )
}

const Blog = () => {
  const user = useSelector((state: RootState) => state.user)

  return (
    <>
      <ProfileComponent
        username={user.username}
        profileImage={user.image}
        addName={user.addName}
      />
      <div className="container mx-auto mt-8">
        <div className="grid grid-cols-3 gap-4">
          <FriendList />

          <div className="col-span-2">
            <div className="bg-white p-4 shadow rounded">
              <BlogPosts email={user.email} username={user.username} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Blog

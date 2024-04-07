"use client"

import { useSelector } from "react-redux"
import { RootState } from "../redux"
import { useState } from "react"
import { useRouter } from "next/navigation"

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

const AddPost = () => {
  return (
    <form>
      <textarea
        className="w-full h-24 resize-none border rounded-md p-2 mb-4"
        placeholder="What's on your mind?"
      ></textarea>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Post
      </button>
    </form>
  )
}

const Posts = () => {
  return (
    <div className="mt-4">
      <div className="border-b border-gray-200 py-4">
        <p>
          This is a sample post. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Dolorum, neque?
        </p>
        <div className="items-center mt-2">
          <button className="text-gray-500 hover:text-blue-500">Like</button>
          <button className="text-gray-500 hover:text-blue-500 ml-5 ">
            Comment
          </button>
          <button className="text-gray-500 hover:text-blue-500 ml-5 ">
            Share
          </button>
        </div>
      </div>
    </div>
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
              <AddPost />
              <Posts />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Blog

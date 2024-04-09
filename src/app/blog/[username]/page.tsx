"use client"

import { Suspense, useEffect, useState } from "react"
import axios from "axios"
import { Button, Spinner } from "@radix-ui/themes"
import Post from "./Post"

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
  return (
    <section className="bg-cover bg-center bg-no-repeat bg-gradient-to-b from-blue-700 to-blue-900 py-24 px-4 text-white">
      <div className="container mx-auto text-center">
        <img
          src={
            profileImage
              ? profileImage
              : "https://catherineasquithgallery.com/uploads/posts/2023-01/1674279507_catherineasquithgallery-com-p-kartinka-fonovaya-seraya-foto-124.jpg"
          }
          alt="Profile Picture"
          className="rounded-full w-32 h-32 mx-auto border-4 border-white shadow-lg "
        />
        <div className="relative inline-block">
          <h2 className="text-3xl font-bold mt-4 inline-block ">{username}</h2>{" "}
        </div>
        <p className="text-lg">{addName ? addName : "User"}</p>
        <Button>Subscribe</Button>
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
      <h3 className="text-lg font-semibold mb-4">Posts : </h3>
      {fetchedPosts.length > 0 ? (
        fetchedPosts.map((p: any, index: number) => (
          <Post
            {...p}
            key={index}
            index={index}
            setFetchedPosts={setFetchedPosts}
          />
        ))
      ) : (
        <h3>There's no posts yet</h3>
      )}
    </div>
  )
}

const BlogPosts = ({ username }: { email: string; username: string }) => {
  const [fetchedPosts, setFetchedPosts] = useState([])

  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Posts
          fetchedPosts={fetchedPosts}
          setFetchedPosts={setFetchedPosts}
          username={username}
        />
      </Suspense>
    </>
  )
}

type UserType = {
  username: string
  image: string | null
  addName: string | null
  email: string
}

const Blog = ({ params }: { params: { username: string } }) => {
  const { username } = params

  const [user, setUser] = useState<UserType>({
    username: "",
    email: "",
    image: null,
    addName: null,
  })

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/user/get/${username}`)

      setUser(res.data.user)
    }

    fetchUser()
  }, [username])

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

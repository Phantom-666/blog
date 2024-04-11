"use client"

import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux"
import { Suspense, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import Post from "./Post"
import { Spinner, Table } from "@radix-ui/themes"
import { PostType, addPostRedux, setPosts } from "../redux/posts/postsActions"
import { EditButton } from "./EditButton"

const ProfileComponent = () => {
  const user = useSelector((state: RootState) => state.user)

  const [isHovered, setIsHovered] = useState(false)

  const { push } = useRouter()

  return (
    <section className="bg-cover bg-center bg-no-repeat bg-gradient-to-b from-blue-700 to-blue-900 py-24 px-4 text-white">
      <div className="container mx-auto text-center">
        <img
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          src={
            user.image
              ? user.image
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
            {user.username}
          </h2>
          {isHovered && <EditButton />}
        </div>
        <p className="text-lg">{user.addName ? user.addName : "User"}</p>
      </div>
    </section>
  )
}

const SubscribersList = () => {
  const [subscribers, setSubscribers] = useState({
    subscribers: [],
    subscribedTo: [],
    length: 0,
  })

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const res = await axios.get("/api/subscribers/get")

        let length = 0

        if (res.data.subs.subscribers.length > length)
          length = res.data.subs.subscribers.length

        if (res.data.subs.subscribedTo.length > length)
          length = res.data.subs.subscribedTo.length

        res.data.subs.length = length

        setSubscribers(res.data.subs)
      } catch (error) {
        console.log("error", error)
      }
    }
    fetchSubscribers()
  }, [])

  const { push } = useRouter()

  return (
    <div className="col-span-1">
      <div className="bg-white p-4 shadow rounded">
        <h3 className="text-lg font-semibold mb-4">Friends</h3>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Subscribers</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Subscribed to</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {new Array(subscribers.length).fill("").map((s, i) => {
              return (
                <Table.Row key={i}>
                  <Table.RowHeaderCell
                    onClick={
                      subscribers.subscribers[i] &&
                      (() => push(`/blog/${subscribers.subscribers[i]}`))
                    }
                    className={
                      subscribers.subscribers[i] &&
                      "hover:cursor-pointer hover:text-blue-600"
                    }
                  >
                    {subscribers.subscribers[i]}
                  </Table.RowHeaderCell>

                  <Table.Cell></Table.Cell>
                  <Table.Cell
                    onClick={
                      subscribers.subscribedTo[i] &&
                      (() => push(`/blog/${subscribers.subscribedTo[i]}`))
                    }
                    className={
                      subscribers.subscribedTo[i] &&
                      "hover:cursor-pointer hover:text-blue-600"
                    }
                  >
                    {subscribers.subscribedTo[i]}
                  </Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table.Root>
      </div>
    </div>
  )
}

const AddPost = ({ email }: { email: string }) => {
  const [post, setPost] = useState("")

  const dispatch = useDispatch()

  const addPost = async () => {
    try {
      const res = await axios.post("/api/post/add", { email, post })

      setPost("")

      res.data.post.likes = 0

      //add to the top
      dispatch(addPostRedux({ post: res.data.post }))
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

const fetchPosts = async (username: string, dispatch: any) => {
  const res = await axios.get(`/api/post/${username}`)

  for (let i = 0; i < res.data.posts.length; ++i) {
    res.data.posts[i].likes = res.data.likesArray[i]
    res.data.posts[i].likedByYou = res.data.likedByYou[i]
  }

  dispatch(setPosts({ posts: res.data.posts }))
}

const Posts = ({ username }: { username: string }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (username) {
      fetchPosts(username, dispatch)
    }
  }, [username])

  const posts = useSelector(
    (state: { posts: { posts: PostType[] } }) => state.posts.posts
  )

  return (
    <div className="mt-4">
      {posts.map((p: any, index: number) => (
        <Post {...p} key={index} index={index} />
      ))}
    </div>
  )
}

const BlogPosts = () => {
  const user = useSelector((state: RootState) => state.user)

  return (
    <>
      <AddPost email={user.email} />
      <Suspense fallback={<Spinner />}>
        <Posts username={user.username} />
      </Suspense>
    </>
  )
}

const Blog = () => {
  return (
    <>
      <ProfileComponent />
      <div className="container mx-auto mt-8">
        <div className="grid grid-cols-3 gap-4">
          <Suspense fallback={<Spinner />}>
            <SubscribersList />
          </Suspense>

          <div className="col-span-2">
            <div className="bg-white p-4 shadow rounded">
              <BlogPosts />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Blog

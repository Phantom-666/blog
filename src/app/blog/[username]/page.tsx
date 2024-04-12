"use client"

import { Suspense, useEffect, useState } from "react"
import axios from "axios"
import { Button, Spinner, Table } from "@radix-ui/themes"
import Post from "./Post"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/app/redux"
import { useRouter } from "next/navigation"
import {
  ObserverType,
  setObserver,
  setPosts,
  subscribeToObserver,
} from "@/app/redux/observer/observerActions"

const ProfileComponent = () => {
  const [isHovered, setIsHovered] = useState(false)

  const observer: ObserverType = useSelector((state: any) => state.observer)

  const dispatch = useDispatch()

  const subscribe = async () => {
    try {
      const res = await axios.post("/api/subscribers/subscribe", {
        username: observer.username,
      })

      dispatch(subscribeToObserver({ subscribers: res.data.subscribers }))
    } catch (error) {
      console.log("err", error)
    }
  }
  const mainUsername = useSelector((state: RootState) => state.user.username)

  const isSubcribed = observer.subscribers.indexOf(mainUsername) !== -1

  return (
    <section className="bg-cover bg-center bg-no-repeat bg-gradient-to-b from-blue-700 to-blue-900 py-24 px-4 text-white">
      <div className="container mx-auto text-center">
        <img
          src={
            observer.image
              ? observer.image
              : "https://catherineasquithgallery.com/uploads/posts/2023-01/1674279507_catherineasquithgallery-com-p-kartinka-fonovaya-seraya-foto-124.jpg"
          }
          alt="Profile Picture"
          className="rounded-full w-32 h-32 mx-auto border-4 border-white shadow-lg "
        />
        <div className="relative inline-block">
          <h2 className="text-3xl font-bold mt-4 inline-block ">
            {observer.username}
          </h2>{" "}
        </div>
        <p className="text-lg">
          {observer.addName ? observer.addName : "User"}
        </p>
        {mainUsername !== observer.username && (
          <Button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            color={
              isSubcribed
                ? isHovered
                  ? "purple"
                  : "red"
                : isHovered
                ? "green"
                : "indigo"
            }
            className="hover:cursor-pointer"
            onClick={subscribe}
          >
            {isSubcribed ? "Unsubscribe" : "Subscribe"}
          </Button>
        )}
      </div>
    </section>
  )
}

const SubscribersList = () => {
  const { push } = useRouter()

  const observer = useSelector((state: any) => state.observer)

  return (
    <div className="col-span-1">
      <div className="bg-white p-4 shadow rounded">
        <h3 className="text-lg font-semibold mb-4">Subscribers</h3>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Subscribers</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Subscribed to</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {new Array(observer.subLength).fill("").map((s, i) => {
              return (
                <Table.Row key={i}>
                  <Table.RowHeaderCell
                    onClick={
                      observer.subscribers[i] &&
                      (() => push(`/blog/${observer.subscribers[i]}`))
                    }
                    className={
                      observer.subscribers[i] &&
                      "hover:cursor-pointer hover:text-blue-600"
                    }
                  >
                    {observer.subscribers[i]}
                  </Table.RowHeaderCell>

                  <Table.Cell></Table.Cell>
                  <Table.Cell
                    onClick={
                      observer.subscribedTo[i] &&
                      (() => push(`/blog/${observer.subscribedTo[i]}`))
                    }
                    className={
                      observer.subscribedTo[i] &&
                      "hover:cursor-pointer hover:text-blue-600"
                    }
                  >
                    {observer.subscribedTo[i]}
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

const Posts = ({ username }: { username: string }) => {
  const dispatch = useDispatch()

  const posts = useSelector((state: any) => state.observer.posts)

  useEffect(() => {
    if (username) {
      const fetchPosts = async (username: string) => {
        const res = await axios.get(`/api/post/${username}`)

        for (let i = 0; i < res.data.posts.length; ++i) {
          res.data.posts[i].likes = res.data.likesArray[i]
          res.data.posts[i].likedByYou = res.data.likedByYou[i]
        }

        dispatch(setPosts({ posts: res.data.posts }))
      }

      fetchPosts(username)
    }
  }, [username])

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-4">Posts : </h3>
      {!posts || posts.length === 0 ? (
        <h3>There's no posts yet</h3>
      ) : (
        posts.map((p: any, index: number) => (
          <Post {...p} key={index} index={index} />
        ))
      )}
    </div>
  )
}

const BlogPosts = () => {
  const observer = useSelector((state: any) => state.observer)

  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Posts username={observer.username} />
      </Suspense>
    </>
  )
}

const Blog = ({ params }: { params: { username: string } }) => {
  const { username } = params

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/user/get/${username}`)

      res.data.user.subscribers = res.data.subs
      res.data.user.subscribedTo = res.data.subscribedTo

      let length = 0

      if (res.data.subs.length > length) length = res.data.subs.length
      if (res.data.subscribedTo.length > length)
        length = res.data.subscribedTo.length

      res.data.user.subLength = length

      dispatch(setObserver({ observer: res.data.user }))
    }

    fetchUser()
  }, [username])

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

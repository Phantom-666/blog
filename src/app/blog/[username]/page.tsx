"use client"

import { Suspense, useEffect, useState } from "react"
import axios from "axios"
import { Button, Spinner, Table } from "@radix-ui/themes"
import Post from "./Post"
import { useSelector } from "react-redux"
import { RootState } from "@/app/redux"
import { useRouter } from "next/navigation"

type ProfileProps = {
  username: string
  profileImage: string | null
  addName: string | null

  subscribers: string[]
  setUser: any
}

const ProfileComponent = ({
  username,
  profileImage,
  addName,

  subscribers,
  setUser,
}: ProfileProps) => {
  const [isHovered, setIsHovered] = useState(false)

  const subscribe = async () => {
    try {
      const res = await axios.post("/api/subscribers/subscribe", { username })

      setUser((prev: any) => {
        prev.subscribers = res.data.subscribers

        return { ...prev }
      })
    } catch (error) {
      console.log("err", error)
    }
  }
  const mainUsername = useSelector((state: RootState) => state.user.username)

  const isSubcribed = subscribers.indexOf(mainUsername) !== -1

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
        {mainUsername !== username && (
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

type SubscribersListProps = {
  subscribers: any[]
  subscribedTo: any[]
  subLength: number
}

const SubscribersList = ({
  subscribers,
  subscribedTo,
  subLength,
}: SubscribersListProps) => {
  const { push } = useRouter()

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
            {new Array(subLength).fill("").map((s, i) => {
              return (
                <Table.Row key={i}>
                  <Table.RowHeaderCell
                    onClick={
                      subscribers[i] && (() => push(`/blog/${subscribers[i]}`))
                    }
                    className={
                      subscribers[i] &&
                      "hover:cursor-pointer hover:text-blue-600"
                    }
                  >
                    {subscribers[i]}
                  </Table.RowHeaderCell>

                  <Table.Cell></Table.Cell>
                  <Table.Cell
                    onClick={
                      subscribedTo[i] &&
                      (() => push(`/blog/${subscribedTo[i]}`))
                    }
                    className={
                      subscribedTo[i] &&
                      "hover:cursor-pointer hover:text-blue-600"
                    }
                  >
                    {subscribedTo[i]}
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
  subscribers: []
  subscribedTo: []
  subLength: number
}

const Blog = ({ params }: { params: { username: string } }) => {
  const { username } = params

  const [user, setUser] = useState<UserType>({
    username: "",
    email: "",
    image: null,
    addName: null,
    subscribers: [],
    subscribedTo: [],
    subLength: 0,
  })

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
        subscribers={user.subscribers}
        setUser={setUser}
      />
      <div className="container mx-auto mt-8">
        <div className="grid grid-cols-3 gap-4">
          <SubscribersList
            subscribers={user.subscribers}
            subscribedTo={user.subscribedTo}
            subLength={user.subLength}
          />

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

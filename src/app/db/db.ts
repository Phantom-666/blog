import mongoose from "mongoose"
import User from "@/app/models/User"
import Likes from "@/app/models/Likes"
import Post from "@/app/models/Posts"
import {
  FormType,
  UserFromDataBase,
  UserTypeWithEmail,
  UserTypeWithPass,
  UserTypeWithUsername,
} from "./types"

type CreateUserType = {
  username: string
  email: string
  password: string
}

class MongoDb {
  static connection: { isConnected?: number } = {}

  async connect() {
    if (MongoDb.connection.isConnected) {
      return
    }

    const db = await mongoose.connect(process.env.DATABASE_URI!)

    MongoDb.connection.isConnected = db.connections[0].readyState
    console.log("Connection to db")
  }

  async createUser(data: CreateUserType) {
    return await User.create({
      username: data.username,
      email: data.email,
      password: data.password,
    })
  }

  async findOne(
    data: UserTypeWithPass | UserTypeWithEmail | UserTypeWithUsername
  ): Promise<UserFromDataBase> {
    const user = await User.findOne(data)

    return user
  }

  async save(data: UserTypeWithPass | UserTypeWithEmail) {
    ;(data as any).save()
  }

  async isChanged(form: FormType, data: UserTypeWithEmail) {
    const user = await db.findOne(data)

    let status = false
    let error = ""

    //username
    if (form.username !== user.username) {
      status = true

      if (form.username.trim().split(" ").length > 1) {
        return { status: false, error: "Username cannot contain spaces" }
      }

      user.username = form.username.toLowerCase()
    }

    //addName

    if (form.addName !== "" && form.addName !== user.addName) {
      status = true
      user.addName = form.addName
    }

    //image

    if (form.image !== "" && form.image !== user.image) {
      status = true
      user.image = form.image
    }

    //password
    if (form.password !== "" && form.password !== user.password) {
      status = true
      user.password = form.password
    }

    if (status) {
      return { status, error, user }
    } else {
      error = "Nothing to change"

      return { status, error }
    }
  }

  async editUser(form: FormType, data: UserTypeWithEmail) {
    const { status, error, user } = await this.isChanged(form, data)

    if (status) {
      if (!user) return { status: false, error: "No such user" }

      await this.save(user)

      return {
        status: true,
        response: {
          status: "Successfully changed",
          user: {
            username: user.username,
            addName: user.addName,
            image: user.image,
            email: user.email,
          },
        },
      }
    }

    return { status: false, error }
  }

  async findUsersByUsername(input: string) {
    const users = await User.find({
      username: { $regex: input, $options: "i" },
    }).select("username")

    return users
  }

  async findLikesByPostId(id: string) {
    return await Likes.findOne({ postId: id })
  }

  async fetchPosts(username: string, sessionEmail: string) {
    const mainUser = await db.findOne({ email: sessionEmail })
    const mainUserId = mainUser._id

    //posts for page
    const user = await db.findOne({ username })

    if (!user) throw new Error("No such user")

    const likedByYou = []

    const likesArray = []
    for (let post of user.posts) {
      const likes = await db.findLikesByPostId(post._id)
      likesArray.push(likes.likes)
      const i = likes.usersWhoLiked.indexOf(mainUserId)
      likedByYou.push(i !== -1)
    }

    const response = { posts: user.posts, likesArray, likedByYou }

    return response
  }

  async addPost(email: string, content: string) {
    const user = await db.findOne({ email })
    if (!user) throw new Error("No such user")

    const post = new Post({
      text: content,
    })

    const likes = new Likes({ postId: post._id })
    await likes.save()

    user.posts.unshift(post)

    await this.save(user)

    return post
  }

  async deletePost(username: string, id: string) {
    const user = await db.findOne({ username })

    if (!user) throw new Error("No such user")

    const newPosts = []

    for (let post of user.posts) {
      if (String(post._id) !== id) {
        newPosts.push(post)
      }
    }

    user.posts = newPosts

    //likes
    await Likes.deleteOne({ postId: id })
    await db.save(user)
  }

  async likePost(username: string, postId: string) {
    const likeSchema = await Likes.findOne({ postId })

    if (!likeSchema) throw new Error("No such post")

    const user = await User.findOne({ username })
    if (!user) throw new Error("No such user")

    const indexToDelete = likeSchema.usersWhoLiked.indexOf(user._id)

    let likedByYou = false

    if (indexToDelete !== -1) {
      likeSchema.likes -= 1
      likeSchema.usersWhoLiked.splice(indexToDelete, 1)
    } else {
      likeSchema.likes += 1
      likeSchema.usersWhoLiked.push(user._id)
      likedByYou = true
    }

    await likeSchema.save()

    return { counter: likeSchema.likes, likedByYou }
  }

  async getMySubscribers(username: string) {
    const subscribers = await User.findOne({
      username,
    }).select("subscribers subscribedTo")

    const newSubscribers = []
    const subscribedTo = []

    for (let sub of subscribers.subscribers) {
      const subUser = await User.findById(sub)

      newSubscribers.push(subUser.username)
    }

    for (let sub of subscribers.subscribedTo) {
      const subUser = await User.findById(sub)

      subscribedTo.push(subUser.username)
    }

    return { subs: { subscribers: newSubscribers, subscribedTo } }
  }

  async subscribeTo(username: string, mainUsername: string) {
    const user = await User.findOne({ username })

    if (!user) throw new Error("No such user")

    const mainUser = await User.findOne({ username: mainUsername })
    if (!mainUser) throw new Error("No such user")

    const index = user.subscribers.indexOf(mainUser._id)

    if (index === -1) {
      //subscribe
      user.subscribers.push(mainUser._id)
      mainUser.subscribedTo.push(user._id)
    } else {
      user.subscribers.splice(index, 1)
      mainUser.subscribedTo.splice(index, 1)
    }

    const subscribers = []
    const subscribedTo = []

    for (let sub of user.subscribers) {
      const newUser = await User.findById(sub)
      subscribers.push(newUser.username)
    }

    for (let sub of mainUser.subscribedTo) {
      const newUser = await User.findById(sub)
      subscribedTo.push(newUser.username)
    }

    await user.save()
    await mainUser.save()

    return { subscribers, subscribedTo }
  }

  async getSubscribers(username: string) {
    const user = await User.findOne({ username }).select(
      "username image addName email subscribers subscribedTo"
    )

    if (!user) throw new Error("No such user")

    const subs = []
    const subscribedTo = []

    for (let id of user.subscribers) {
      const sub = await User.findById(id)

      subs.push(sub.username)
    }

    for (let id of user.subscribedTo) {
      const sub = await User.findById(id)
      subscribedTo.push(sub.username)
    }

    return { user, subs, subscribedTo }
  }
}

const db = new MongoDb()

export default db

export type UserTypeWithEmail = {
  email: string
}
export type UserTypeWithUsername = {
  username: string
}

export type UserTypeWithPass = {
  email: string
  password: string
}

export type UserFromDataBase = {
  _id: string
  username: string
  email: string
  image: string
  addName: string
  password: string
  posts: { _id: string }[]
}

export type FormType = {
  username: string
  image: string
  password: string
  addName: string
}

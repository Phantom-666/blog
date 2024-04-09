"use client"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { Button, Flex, Table, TextField } from "@radix-ui/themes"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"

type UsersProps = {
  users: { username: string }[]
}

const Users = (props: UsersProps) => {
  const { push } = useRouter()

  const goTo = (username: string) => {
    push(`/blog/${username}`)
  }

  return (
    <div className="mt-4">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Users</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {props.users.map((u, i) => (
            <Table.Row
              key={i}
              className="hover:text-blue-400 hover:cursor-pointer"
              onClick={() => goTo(u.username)}
            >
              <Table.RowHeaderCell></Table.RowHeaderCell>
              <Table.Cell></Table.Cell>
              <Table.Cell>{u.username}</Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}

const Find = () => {
  const [input, setInput] = useState("")

  const [users, setUsers] = useState([])

  const findPeople = async () => {
    const res = await axios.post("/api/find", { input })

    setUsers(res.data.users)
  }

  return (
    <div className="flex justify-center ">
      <div className="max-w-md w-full">
        <div className="mt-8">
          <TextField.Root
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Find people"
          >
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
        </div>

        <div className="mt-3">
          <Button onClick={findPeople}>Find</Button>
        </div>

        <Users users={users} />
      </div>
    </div>
  )
}

export default Find

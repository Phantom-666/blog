"use client"

import { TabNav } from "@radix-ui/themes"
import { useRouter, usePathname } from "next/navigation"
import { getSession } from "../lib/auth"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loginAction } from "../redux/login/loginActions"
import { RootState } from "../redux"

type TabNavLinkProps = {
  name: string
  pathName: string
  currentP: string
}

const TabNavLink = ({ name, pathName, currentP }: TabNavLinkProps) => {
  const { push } = useRouter()
  const pushTo = (path: string) => () => push(path)
  return (
    <>
      <TabNav.Link onClick={pushTo(pathName)} active={pathName === currentP}>
        {name}
      </TabNav.Link>
    </>
  )
}

const NavBar = () => {
  // /auth/reg
  const p = usePathname()
  const dispath = useDispatch()

  const state = useSelector((state: RootState) => state.user)

  const tabsGuest = [
    { name: "Main", path: "/" },
    { name: "Register", path: "/auth/reg" },
    { name: "Login", path: "/auth/login" },
  ]

  const tabsUser = [
    { name: "Main", path: "/" },
    { name: "My Blog", path: "/blog" },
    { name: "Find people", path: "/find" },
    { name: "Shop", path: "/shop" },
    { name: "Log out", path: "/auth/logout" },
  ]

  useEffect(() => {
    const fun = async () => {
      const session = await getSession()
      console.log("session", session)

      if (session) {
        dispath(loginAction(session.user))
      }
    }

    fun()
  }, [])

  return (
    <TabNav.Root>
      {state.isAuthorized === true
        ? tabsUser.map((t, i) => (
            <TabNavLink key={i} name={t.name} pathName={t.path} currentP={p} />
          ))
        : tabsGuest.map((t, i) => (
            <TabNavLink key={i} name={t.name} pathName={t.path} currentP={p} />
          ))}
    </TabNav.Root>
  )
}

export default NavBar

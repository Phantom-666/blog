"use client"

import { TabNav } from "@radix-ui/themes"
import { useRouter, usePathname } from "next/navigation"

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

  const tabs = [
    { name: "Main", path: "/" },
    { name: "Register", path: "/auth/reg" },
    { name: "Login", path: "/auth/login" },
  ]

  return (
    <TabNav.Root>
      {tabs.map((t, i) => (
        <TabNavLink key={i} name={t.name} pathName={t.path} currentP={p} />
      ))}
    </TabNav.Root>
  )
}

export default NavBar

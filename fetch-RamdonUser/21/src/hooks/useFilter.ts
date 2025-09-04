import { useState, useMemo } from "react"
import type { User as RandomUser } from "../types"


export const useFilter = (users: RandomUser[]) => {
  const [filterText, setFilterText] = useState("")
  const [sortBy, setSortBy] = useState<"name" | "country" | null>(null)

  const filteredUsers = useMemo(() => {
    if (!filterText) return users
    return users.filter((user) =>
      `${user.name.first} ${user.name.last} ${user.location.country}`
        .toLowerCase()
        .includes(filterText.toLowerCase())
    )
  }, [users, filterText])

  const sortedUsers = useMemo(() => {
    if (!sortBy) return filteredUsers
    return [...filteredUsers].sort((a, b) => {
      if (sortBy === "name") return a.name.first.localeCompare(b.name.first)
      if (sortBy === "country") return a.location.country.localeCompare(b.location.country)
      return 0
    })
  }, [filteredUsers, sortBy])

  return { filterText, setFilterText, sortBy, setSortBy, sortedUsers }
}
  
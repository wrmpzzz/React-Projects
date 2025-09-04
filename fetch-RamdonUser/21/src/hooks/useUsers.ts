import { useEffect, useRef, useState } from "react"
import type { User as RandomUser } from "../types"

export const useUsers = () => {
  const [users, setUsers] = useState<RandomUser[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const originalUsers = useRef<RandomUser[]>([])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch("https://randomuser.me/api/?results=12")
      if (!response.ok) throw new Error("Error al obtener usuarios")
      const data = await response.json()
      setUsers(data.results)
      originalUsers.current = data.results
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const removeUser = (id: string) => {
    setUsers((prev) => prev.filter((user) => `${user.login.uuid}-${user.email}` !== id))
  }

  const deleteAllUsers = () => setUsers([])
  const resetUsers = () => setUsers(originalUsers.current)

  return { users, loading, error, removeUser, deleteAllUsers, resetUsers, fetchUsers }
}
// hooks/useFilter.ts - Hook de filtros optimizado
import { useState, useMemo } from "react"
import { filterUsers, sortUsers } from '../utils'
import type { User, SortOption } from "../types/types"

interface UseFilterReturn {
  filterText: string
  setFilterText: (value: string) => void
  sortBy: SortOption
  setSortBy: (sortBy: SortOption) => void
  sortedUsers: User[]
  filteredCount: number
  totalCount: number
}

export const useFilter = (users: User[]): UseFilterReturn => {
  const [filterText, setFilterText] = useState("")
  const [sortBy, setSortBy] = useState<SortOption>(null)

  const filteredUsers = useMemo(() => 
    filterUsers(users, filterText), 
    [users, filterText]
  )

  const sortedUsers = useMemo(() => 
    sortUsers(filteredUsers, sortBy), 
    [filteredUsers, sortBy]
  )

  return { 
    filterText, 
    setFilterText, 
    sortBy, 
    setSortBy, 
    sortedUsers,
    filteredCount: sortedUsers.length,
    totalCount: users.length,
  }
}
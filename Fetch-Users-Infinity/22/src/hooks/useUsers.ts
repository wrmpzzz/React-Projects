// hooks/useUsers.ts - Hook limpio y optimizado
import { useInfiniteQuery, useQueryClient, type InfiniteData } from '@tanstack/react-query'
import { API_CONFIG, QUERY_KEYS } from '../constants'
import { buildApiUrl } from '../utils'
import type { ApiResponse, User, UsersState, UserActions } from '../types/types'

type InfiniteUsersData = InfiniteData<ApiResponse, number>

interface UseUsersReturn extends UsersState, UserActions {}

export const useUsers = (): UseUsersReturn => {
  const queryClient = useQueryClient()

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    refetch
  } = useInfiniteQuery({
    queryKey: QUERY_KEYS.USERS,
    queryFn: async ({ pageParam = 1 }) => {
      const url = buildApiUrl(pageParam, API_CONFIG.RESULTS_PER_PAGE)
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data: ApiResponse = await response.json()
      return data
    },
    getNextPageParam: (lastPage) => lastPage.info.page + 1,
    initialPageParam: 1,
    staleTime: API_CONFIG.STALE_TIME,
    refetchOnWindowFocus: false,
  })

  // Aplanar todos los usuarios de todas las páginas
  const users: User[] = data?.pages.flatMap(page => page.results) ?? []

  // Acciones CRUD optimizadas
  const removeUser = (id: string): void => {
    queryClient.setQueryData<InfiniteUsersData>(QUERY_KEYS.USERS, (oldData) => {
      if (!oldData) return oldData
      
      return {
        ...oldData,
        pages: oldData.pages.map((page) => ({
          ...page,
          results: page.results.filter((user) => 
            `${user.login.uuid}-${user.email}` !== id
          )
        }))
      }
    })
  }

  const deleteAllUsers = (): void => {
    queryClient.setQueryData<InfiniteUsersData>(QUERY_KEYS.USERS, (oldData) => {
      if (!oldData) return oldData
      
      return {
        ...oldData,
        pages: oldData.pages.map((page) => ({
          ...page,
          results: []
        }))
      }
    })
  }

  const deleteAllUsersAndReset = (): void => {
    queryClient.setQueryData<InfiniteUsersData>(QUERY_KEYS.USERS, (oldData) => {
      if (!oldData) return oldData
      
      return {
        ...oldData,
        pages: oldData.pages.length > 0 
          ? [{ ...oldData.pages[0], results: [] }] 
          : []
      }
    })
  }

  const resetUsers = (): void => {
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS })
    refetch()
  }

  const reloadUsers = (): void => {
    queryClient.removeQueries({ queryKey: QUERY_KEYS.USERS })
    refetch()
  }

  const resetWithSamePages = async (): Promise<void> => {
    const currentPages = data?.pages.length ?? 1
    
    queryClient.removeQueries({ queryKey: QUERY_KEYS.USERS })
    await refetch()
    
    // Carga páginas adicionales si tenía más de 1
    for (let i = 2; i <= currentPages; i++) {
      if (hasNextPage) {
        await fetchNextPage()
      }
    }
  }

  return {
    // Estado
    users,
    isLoading,
    error: error as Error | null,
    fetchNextPage,
    hasNextPage: hasNextPage ?? false,
    isFetchingNextPage,
    
    // Acciones
    removeUser,
    deleteAllUsers,
    deleteAllUsersAndReset,
    resetUsers,
    reloadUsers,
    resetWithSamePages,
  }
}
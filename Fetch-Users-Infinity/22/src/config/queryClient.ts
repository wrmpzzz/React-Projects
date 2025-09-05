// config/queryClient.ts - Configuración centralizada de React Query
import { QueryClient } from '@tanstack/react-query'
import { API_CONFIG } from '../constants'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: API_CONFIG.STALE_TIME,
      refetchOnWindowFocus: false,
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      retry: 1,
    },
  },
})

// Tipos para el cliente de query
export type QueryClientType = typeof queryClient
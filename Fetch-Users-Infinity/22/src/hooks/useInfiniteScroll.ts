// hooks/useInfiniteScroll.ts - Hook optimizado con throttle
import { useEffect, useCallback, useRef } from 'react'

interface UseInfiniteScrollProps {
  hasNextPage: boolean
  isFetchingNextPage: boolean
  fetchNextPage: () => void
  threshold?: number // Pixels antes del final para disparar
}

export const useInfiniteScroll = ({ 
  hasNextPage, 
  isFetchingNextPage, 
  fetchNextPage,
  threshold = 100
}: UseInfiniteScrollProps): void => {
  const timeoutRef = useRef<NodeJS.Timeout>()

  const handleScroll = useCallback(() => {
    // Throttle para evitar muchas ejecuciones
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      const { innerHeight } = window
      const { scrollTop, offsetHeight } = document.documentElement

      // Verifica si estamos cerca del final
      const isNearBottom = innerHeight + scrollTop >= offsetHeight - threshold

      if (isNearBottom && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    }, 100) // Throttle de 100ms
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, threshold])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [handleScroll])
}
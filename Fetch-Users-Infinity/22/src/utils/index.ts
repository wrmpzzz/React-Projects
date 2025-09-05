// utils/index.ts - Funciones utilitarias limpias
import type { User } from '../types/types'

/**
 * Genera un ID único para un usuario
 */
export const generateUserId = (user: User): string => {
  return `${user.login.uuid}-${user.email}`
}

/**
 * Formatea una fecha a formato español
 */
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

/**
 * Filtra usuarios por texto de búsqueda
 */
export const filterUsers = (users: User[], searchText: string): User[] => {
  if (!searchText) return users
  
  const lowerSearchText = searchText.toLowerCase()
  
  return users.filter((user) =>
    `${user.name.first} ${user.name.last} ${user.location.country}`
      .toLowerCase()
      .includes(lowerSearchText)
  )
}

/**
 * Ordena usuarios según el criterio especificado
 */
export const sortUsers = (users: User[], sortBy: "name" | "country" | null): User[] => {
  if (!sortBy) return users
  
  return [...users].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.first.localeCompare(b.name.first)
      case "country":
        return a.location.country.localeCompare(b.location.country)
      default:
        return 0
    }
  })
}

/**
 * Construye la URL de la API con parámetros
 */
export const buildApiUrl = (page: number, resultsPerPage: number): string => {
  return `https://randomuser.me/api/?results=${resultsPerPage}&page=${page}`
}

/**
 * Verifica si el usuario llegó al final de la página
 */
export const isAtBottomOfPage = (): boolean => {
  return (
    window.innerHeight + document.documentElement.scrollTop >= 
    document.documentElement.offsetHeight - 100 // 100px antes del final
  )
}

/**
 * Genera el nombre completo de un usuario
 */
export const getFullName = (user: User): string => {
  return `${user.name.title} ${user.name.first} ${user.name.last}`
}

/**
 * Genera la dirección completa de un usuario
 */
export const getFullAddress = (user: User): string => {
  const { street, city, state, postcode, country } = user.location
  return `${street.number} ${street.name}, ${city}, ${state} ${postcode}, ${country}`
}
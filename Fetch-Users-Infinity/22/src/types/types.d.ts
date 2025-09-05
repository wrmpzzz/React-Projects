// types/index.ts - Tipos limpios y organizados
export interface Name {
  first: string
  last: string
  title: string
}

export interface Street {
  name: string
  number: number
}

export interface Location {
  city: string
  country: string
  state: string
  street: Street
  postcode: string | number
}

export interface Picture {
  large: string
  medium: string
  thumbnail: string
}

export interface Login {
  uuid: string
  username: string
}

export interface DateOfBirth {
  date: string
  age: number
}

export interface User {
  name: Name
  location: Location
  email: string
  phone: string
  cell: string
  picture: Picture
  login: Login
  gender: string
  dob: DateOfBirth
  nat: string
}

export interface ApiInfo {
  page: number
  results: number
  seed: string
  version: string
}

export interface ApiResponse {
  results: User[]
  info: ApiInfo
}

// Tipos para filtros y ordenamiento
export type SortOption = "name" | "country" | null

// Tipos para acciones de usuarios
export interface UserActions {
  removeUser: (id: string) => void
  deleteAllUsers: () => void
  deleteAllUsersAndReset: () => void
  resetUsers: () => void
  reloadUsers: () => void
  resetWithSamePages: () => Promise<void>
}

// Tipo para el estado de usuarios
export interface UsersState {
  users: User[]
  isLoading: boolean
  error: Error | null
  fetchNextPage: () => void
  hasNextPage: boolean
  isFetchingNextPage: boolean
}

// Props para componentes
export interface UserCardProps {
  user: User
  onRemove: (id: string) => void
  onViewDetails: (user: User) => void
}

export interface UserModalProps {
  user: User | null
  isOpen: boolean
  onClose: () => void
}

export interface ControlsProps {
  onDeleteAll: () => void
  onDeleteAllAndReset: () => void
  onReset: () => void
  onReload: () => void
  onResetWithSamePages: () => void
  currentPagesCount: number
}

export interface FilterProps {
  value: string
  onChange: (value: string) => void
}

export interface SorterProps {
  sortBy: SortOption
  onSort: (type: SortOption) => void
}

export interface LoadingSpinnerProps {
  text?: string
  size?: "small" | "medium" | "large"
}
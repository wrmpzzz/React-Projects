// App.tsx - Aplicación final limpia y optimizada
import { useState } from 'react'
import { QueryClientProvider, type InfiniteData } from '@tanstack/react-query'
import { queryClient } from './config/queryClient'
import { useUsers } from './hooks/useUsers'
import { useFilter } from './hooks/useFilter'
import { useInfiniteScroll } from './hooks/useInfiniteScroll'
import UserCard from './components/Card'
import UserModal from './components/UserModal'
import Controls from './components/Controls'
import Filter from './components/Filter'
import Sorter from './components/Sorter'
import LoadingSpinner, { LoadingGrid } from './components/LoadingSpinner'
import { QUERY_KEYS, LOADING_MESSAGES } from './constants'
import type { User, ApiResponse } from './types/types'

// Tipo para los datos infinitos
type InfiniteUsersData = InfiniteData<ApiResponse, number>

function UsersApp() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Hooks principales
  const {
    users,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    removeUser,
    deleteAllUsers,
    deleteAllUsersAndReset,
    resetUsers,
    reloadUsers,
    resetWithSamePages,
  } = useUsers()

  const { 
    filterText, 
    setFilterText, 
    sortBy, 
    setSortBy, 
    sortedUsers,
    filteredCount,
    totalCount
  } = useFilter(users)

  // Hook para scroll infinito con threshold personalizado
  useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    threshold: 200 // 200px antes del final
  })

  // Obtener información de páginas cargadas
  const queryData = queryClient.getQueryData<InfiniteUsersData>(QUERY_KEYS.USERS)
  const currentPagesCount = queryData?.pages?.length ?? 0

  // Handlers del modal
  const handleViewDetails = (user: User) => {
    setSelectedUser(user)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedUser(null)
  }

  // Render de error
  if (error) {
    return <ErrorState error={error} onRetry={reloadUsers} />
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Lista de Usuarios Aleatorios
          </h1>
          <p className="text-gray-400">
            {totalCount > 0 && (
              <>
                {filteredCount} de {totalCount} usuarios
                {filterText && ` (filtrado por "${filterText}")`}
              </>
            )}
          </p>
        </header>
        
        {/* Controles */}
        <Controls
          onDeleteAll={deleteAllUsers}
          onDeleteAllAndReset={deleteAllUsersAndReset}
          onReset={resetUsers}
          onReload={reloadUsers}
          onResetWithSamePages={resetWithSamePages}
          currentPagesCount={currentPagesCount}
        />
        
        {/* Filtros y ordenamiento */}
        <Filter value={filterText} onChange={setFilterText} />
        <Sorter sortBy={sortBy} onSort={setSortBy} />

        {/* Contenido principal */}
        <main>
          {/* Loading inicial con skeleton */}
          {isLoading && users.length === 0 && (
            <LoadingGrid count={12} />
          )}

          {/* Lista de usuarios */}
          {sortedUsers.length > 0 && (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sortedUsers.map((user) => (
                <UserCard
                  key={`${user.login.uuid}-${user.email}`}
                  user={user}
                  onRemove={removeUser}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </ul>
          )}

          {/* Loading de más usuarios */}
          {isFetchingNextPage && (
            <LoadingSpinner text={LOADING_MESSAGES.MORE} />
          )}

          {/* Estados vacíos */}
          <EmptyStates 
            sortedUsersCount={sortedUsers.length}
            totalUsersCount={users.length}
            isLoading={isLoading}
            hasError={!!error}
            filterText={filterText}
            hasNextPage={hasNextPage}
            onReset={resetUsers}
          />
        </main>
      </div>

      {/* Modal de detalles */}
      <UserModal
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}

// Componente de error
interface ErrorStateProps {
  error: Error
  onRetry: () => void
}

function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">😵</div>
        <h1 className="text-2xl font-bold text-red-500 mb-4">
          {LOADING_MESSAGES.ERROR}
        </h1>
        <p className="text-gray-400 mb-6">
          {error.message}
        </p>
        <button
          onClick={onRetry}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
        >
          {LOADING_MESSAGES.RETRY}
        </button>
      </div>
    </div>
  )
}

// Componente para estados vacíos
interface EmptyStatesProps {
  sortedUsersCount: number
  totalUsersCount: number
  isLoading: boolean
  hasError: boolean
  filterText: string
  hasNextPage: boolean
  onReset: () => void
}

function EmptyStates({ 
  sortedUsersCount, 
  totalUsersCount, 
  isLoading, 
  hasError, 
  filterText,
  hasNextPage,
  onReset 
}: EmptyStatesProps) {
  // No hay más usuarios para cargar
  if (!hasNextPage && totalUsersCount > 0) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-2">🎉</div>
        <p className="text-gray-400">{LOADING_MESSAGES.NO_MORE}</p>
      </div>
    )
  }

  // No se encontraron usuarios con el filtro
  if (sortedUsersCount === 0 && totalUsersCount > 0 && !isLoading) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-2">🔍</div>
        <p className="text-gray-400 mb-2">{LOADING_MESSAGES.NOT_FOUND}</p>
        {filterText && (
          <p className="text-gray-500 text-sm">
            Intenta con otro término de búsqueda
          </p>
        )}
      </div>
    )
  }

  // No hay usuarios en absoluto
  if (totalUsersCount === 0 && !isLoading && !hasError) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-4">👥</div>
        <p className="text-gray-400 mb-4">{LOADING_MESSAGES.NO_USERS}</p>
        <button
          onClick={onReset}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          {LOADING_MESSAGES.LOAD_USERS}
        </button>
      </div>
    )
  }

  return null
}

// Componente principal con Provider
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UsersApp />
    </QueryClientProvider>
  )
}
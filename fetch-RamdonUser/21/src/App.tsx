import UserCard from "./components/Card"
import Controls from "./components/Controls"
import Filter from "./components/Filter"
import Sorter from "./components/Sorter"
import { useFilter } from "./hooks/useFilter"
import { useUsers } from "./hooks/useUsers"


function App() {
  const { users, loading, error, removeUser, deleteAllUsers, resetUsers, fetchUsers } = useUsers()
  const { filterText, setFilterText, sortBy, setSortBy, sortedUsers } = useFilter(users)

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white text-center mb-8">Random Users</h1>

        <Controls onDeleteAll={deleteAllUsers} onReset={resetUsers} onReload={fetchUsers} />

        <Filter value={filterText} onChange={setFilterText} />

        <Sorter sortBy={sortBy} onSort={setSortBy} />

        {loading && <p className="text-center text-gray-300">Cargando usuarios...</p>}
        {error && <p className="text-center text-red-400">Error: {error}</p>}

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedUsers.map((user) => (
            <UserCard key={`${user.login.uuid}-${user.email}`} user={user} onRemove={removeUser} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App

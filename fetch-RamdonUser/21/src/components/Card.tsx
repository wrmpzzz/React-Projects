import { MapPin, Trash2, User } from "lucide-react"
import type { User as RandomUser } from "../types"

interface UserCardProps {
  user: RandomUser
  onRemove: (id: string) => void
}

export default function UserCard({ user, onRemove }: UserCardProps) {
  const userId = `${user.login.uuid}-${user.email}`

  return (
    <li
      key={userId}
      className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-105 relative"
    >
      <div className="text-center group">
        <img
          src={user.picture.large}
          alt={user.name.first}
          className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-600 shadow-lg"
        />
        <h2 className="text-xl font-semibold text-white mb-2">
          {user.name.first} {user.name.last}
        </h2>
        <div className="flex items-center justify-center space-x-2 mb-2">
          <User className="text-gray-400" size={16} />
          <p className="text-gray-300 capitalize">{user.gender}</p>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <MapPin className="text-gray-400" size={16} />
          <p className="text-gray-400 text-sm">
            {user.location.city}, {user.location.country}
          </p>
        </div>

        {/* Botón eliminar individual */}
        <button
          onClick={() => onRemove(userId)}
          className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100"
          title="Eliminar usuario"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </li>
  )
}

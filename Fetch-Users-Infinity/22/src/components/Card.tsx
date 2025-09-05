// components/UserCard.tsx - Componente limpio y optimizado
import { MapPin, Trash2, User as UserIcon, Eye } from "lucide-react"
import { generateUserId, getFullName } from "../utils"
import type { UserCardProps } from "../types/types"

export default function UserCard({ user, onRemove, onViewDetails }: UserCardProps) {
  const userId = generateUserId(user)
  const fullName = getFullName(user)

  return (
    <li className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-105 relative group">
      <div className="text-center">
        {/* Avatar */}
        <img
          src={user.picture.large}
          alt={fullName}
          className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-600 shadow-lg"
          loading="lazy"
        />

        {/* Información básica */}
        <h2 className="text-xl font-semibold text-white mb-2">
          {user.name.first} {user.name.last}
        </h2>

        <div className="flex items-center justify-center space-x-2 mb-2">
          <UserIcon className="text-gray-400" size={16} />
          <p className="text-gray-300 capitalize">{user.gender}</p>
        </div>

        <div className="flex items-center justify-center space-x-2 mb-4">
          <MapPin className="text-gray-400" size={16} />
          <p className="text-gray-400 text-sm">
            {user.location.city}, {user.location.country}
          </p>
        </div>

        {/* Botón ver detalles */}
        <button
          onClick={() => onViewDetails(user)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 mx-auto"
          aria-label={`Ver detalles de ${fullName}`}
        >
          <Eye size={16} />
          Ver detalles
        </button>

        {/* Botón eliminar (aparece solo en hover) */}
        <button
          onClick={() => onRemove(userId)}
          className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100"
          aria-label={`Eliminar ${fullName}`}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </li>
  )
}
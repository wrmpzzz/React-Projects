// components/Sorter.tsx - Ordenador limpio y consistente
import { ArrowUpDown, User, MapPin, X } from "lucide-react"
import type { SorterProps } from "../types/types"

export default function Sorter({ sortBy, onSort }: SorterProps) {
  return (
    <div className="flex justify-center gap-3 mb-6 flex-wrap">
      <SortButton
        isActive={sortBy === "name"}
        onClick={() => onSort("name")}
        icon={<User size={16} />}
        label="Ordenar por nombre"
        variant="purple"
      />

      <SortButton
        isActive={sortBy === "country"}
        onClick={() => onSort("country")}
        icon={<MapPin size={16} />}
        label="Ordenar por país"
        variant="yellow"
      />

      <SortButton
        isActive={sortBy === null}
        onClick={() => onSort(null)}
        icon={<X size={16} />}
        label="Sin orden"
        variant="gray"
      />
    </div>
  )
}

// Componente auxiliar para botones de ordenamiento
interface SortButtonProps {
  isActive: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
  variant: 'purple' | 'yellow' | 'gray'
}

function SortButton({ isActive, onClick, icon, label, variant }: SortButtonProps) {
  const variants = {
    purple: {
      active: 'bg-purple-700 text-white shadow-lg',
      inactive: 'bg-purple-600 hover:bg-purple-700 text-white/80 hover:text-white'
    },
    yellow: {
      active: 'bg-yellow-700 text-white shadow-lg',
      inactive: 'bg-yellow-600 hover:bg-yellow-700 text-white/80 hover:text-white'
    },
    gray: {
      active: 'bg-gray-700 text-white shadow-lg',
      inactive: 'bg-gray-600 hover:bg-gray-700 text-white/80 hover:text-white'
    }
  }

  const className = `px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
    isActive ? variants[variant].active : variants[variant].inactive
  }`

  return (
    <button
      onClick={onClick}
      className={className}
      aria-pressed={isActive}
      aria-label={label}
    >
      {icon}
      {label}
      {isActive && <ArrowUpDown size={14} className="ml-1" />}
    </button>
  )
}
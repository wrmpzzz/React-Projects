// components/Filter.tsx - Filtro limpio y optimizado
import { Search, X } from "lucide-react"
import type { FilterProps } from "../types"

export default function Filter({ value, onChange }: FilterProps) {
  const handleClear = () => {
    onChange('')
  }

  return (
    <div className="flex justify-center mb-6">
      <div className="relative w-full max-w-md">
        <div className="flex items-center bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus-within:border-blue-500 transition-colors">
          <Search size={16} className="mr-2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre o país..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="bg-transparent outline-none text-sm flex-1 placeholder-gray-400"
            aria-label="Buscar usuarios"
          />
          {value && (
            <button
              onClick={handleClear}
              className="ml-2 text-gray-400 hover:text-white transition-colors"
              aria-label="Limpiar búsqueda"
            >
              <X size={16} />
            </button>
          )}
        </div>
        
        {/* Contador de resultados */}
        {value && (
          <div className="absolute -bottom-6 left-0 text-xs text-gray-400">
            Buscando: "{value}"
          </div>
        )}
      </div>
    </div>
  )
}
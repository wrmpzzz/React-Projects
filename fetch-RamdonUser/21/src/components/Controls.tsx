import { Trash2, RefreshCw } from "lucide-react"

interface ControlsProps {
  onDeleteAll: () => void
  onReset: () => void
  onReload: () => void
}

export default function Controls({ onDeleteAll, onReset, onReload }: ControlsProps) {
  return (
    <div className="flex justify-center gap-3 mb-6 flex-wrap">
      <button
        onClick={onDeleteAll}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2"
      >
        <Trash2 size={16} /> Eliminar todos
      </button>

      <button
        onClick={onReset}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200"
      >
        Restablecer
      </button>

      <button
        onClick={onReload}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200"
      >
        <RefreshCw size={16} /> Recargar
      </button>
    </div>
  )
}

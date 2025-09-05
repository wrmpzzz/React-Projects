// components/Controls.tsx - Controles limpios y organizados
import { Trash2, RefreshCw, RotateCcw, Zap, Database } from "lucide-react"
import { BUTTON_TITLES } from "../constants"
import type { ControlsProps } from "../types/types"

export default function Controls({ 
  onDeleteAll, 
  onDeleteAllAndReset,
  onReset, 
  onReload,
  onResetWithSamePages,
  currentPagesCount
}: ControlsProps) {
  return (
    <div className="space-y-4 mb-6">
      {/* Controles principales */}
      <div className="flex justify-center gap-3 flex-wrap">
        <ControlButton
          onClick={onDeleteAll}
          variant="danger"
          icon={<Trash2 size={16} />}
          title={BUTTON_TITLES.DELETE_ALL}
        >
          Eliminar todos
        </ControlButton>

        <ControlButton
          onClick={onDeleteAllAndReset}
          variant="danger-dark"
          icon={<><Trash2 size={16} /><RotateCcw size={14} /></>}
          title={BUTTON_TITLES.DELETE_AND_RESET}
        >
          Limpiar todo
        </ControlButton>

        <ControlButton
          onClick={onReset}
          variant="primary"
          icon={<RotateCcw size={16} />}
          title={BUTTON_TITLES.RESET}
        >
          Restablecer
        </ControlButton>

        <ControlButton
          onClick={onReload}
          variant="success"
          icon={<RefreshCw size={16} />}
          title={BUTTON_TITLES.RELOAD}
        >
          Recargar
        </ControlButton>

        {currentPagesCount > 1 && (
          <ControlButton
            onClick={onResetWithSamePages}
            variant="purple"
            icon={<Zap size={16} />}
            title={BUTTON_TITLES.RESET_PAGES(currentPagesCount)}
          >
            Resetear {currentPagesCount} páginas
          </ControlButton>
        )}
      </div>

      {/* Información del estado */}
      <div className="flex justify-center">
        <div className="flex items-center gap-2 bg-gray-700 text-gray-300 px-4 py-2 rounded-lg">
          <Database size={16} />
          <span className="text-sm">
            {currentPagesCount} página{currentPagesCount !== 1 ? 's' : ''} cargada{currentPagesCount !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  )
}

// Componente auxiliar para botones consistentes
interface ControlButtonProps {
  onClick: () => void
  variant: 'danger' | 'danger-dark' | 'primary' | 'success' | 'purple'
  icon: React.ReactNode
  title: string
  children: React.ReactNode
}

function ControlButton({ onClick, variant, icon, title, children }: ControlButtonProps) {
  const variants = {
    danger: 'bg-red-600 hover:bg-red-700',
    'danger-dark': 'bg-red-800 hover:bg-red-900',
    primary: 'bg-blue-600 hover:bg-blue-700',
    success: 'bg-green-600 hover:bg-green-700',
    purple: 'bg-purple-600 hover:bg-purple-700',
  }

  return (
    <button
      onClick={onClick}
      className={`${variants[variant]} text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2`}
      title={title}
    >
      {icon}
      {children}
    </button>
  )
}
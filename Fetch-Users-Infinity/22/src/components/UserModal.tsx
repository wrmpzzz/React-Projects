// components/UserModal.tsx - Modal limpio y accesible
import { useEffect } from "react"
import { X, User as UserIcon, Calendar, Mail, Phone, MapPin, Globe } from "lucide-react"
import { formatDate, getFullName, getFullAddress } from "../utils"
import type { UserModalProps } from "../types/types"

export default function UserModal({ user, isOpen, onClose }: UserModalProps) {
  // Manejo de tecla Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden' // Prevenir scroll del body
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen || !user) return null

  const fullName = getFullName(user)
  const fullAddress = getFullAddress(user)

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="bg-gray-800 rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header del modal */}
        <div className="flex justify-between items-center mb-4">
          <h2 id="modal-title" className="text-2xl font-bold text-white">
            Detalles del Usuario
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700 transition-colors"
            aria-label="Cerrar modal"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Información del usuario */}
        <div className="text-center mb-6">
          <img
            src={user.picture.large}
            alt={fullName}
            className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-600"
          />
          <h3 className="text-xl font-semibold text-white mb-2">
            {fullName}
          </h3>
          <p className="text-gray-400">@{user.login.username}</p>
        </div>

        {/* Detalles organizados */}
        <div className="space-y-4 text-gray-300">
          <DetailItem
            icon={<UserIcon className="text-blue-400" size={20} />}
            label="Género"
            value={<span className="capitalize">{user.gender}</span>}
          />

          <DetailItem
            icon={<Calendar className="text-green-400" size={20} />}
            label="Fecha de Nacimiento"
            value={`${formatDate(user.dob.date)} (${user.dob.age} años)`}
          />

          <DetailItem
            icon={<Mail className="text-red-400" size={20} />}
            label="Email"
            value={<a href={`mailto:${user.email}`} className="text-blue-300 hover:underline break-all">{user.email}</a>}
          />

          <DetailItem
            icon={<Phone className="text-yellow-400" size={20} />}
            label="Teléfonos"
            value={
              <div>
                <p>Fijo: <a href={`tel:${user.phone}`} className="text-blue-300 hover:underline">{user.phone}</a></p>
                <p>Móvil: <a href={`tel:${user.cell}`} className="text-blue-300 hover:underline">{user.cell}</a></p>
              </div>
            }
          />

          <DetailItem
            icon={<MapPin className="text-purple-400" size={20} />}
            label="Dirección"
            value={<span className="text-sm">{fullAddress}</span>}
          />

          <DetailItem
            icon={<Globe className="text-cyan-400" size={20} />}
            label="Nacionalidad"
            value={<span className="uppercase font-semibold">{user.nat}</span>}
          />
        </div>

        {/* Footer del modal */}
        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}

// Componente auxiliar para los detalles
interface DetailItemProps {
  icon: React.ReactNode
  label: string
  value: React.ReactNode
}

function DetailItem({ icon, label, value }: DetailItemProps) {
  return (
    <div className="flex items-start gap-3 p-3 bg-gray-700 rounded-lg">
      <div className="mt-1">{icon}</div>
      <div className="w-full">
        <p className="font-semibold text-white mb-1">{label}</p>
        <div className="text-sm">{value}</div>
      </div>
    </div>
  )
}
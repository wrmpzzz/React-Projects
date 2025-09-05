// components/LoadingSpinner.tsx - Spinner limpio y reutilizable
import { RefreshCw } from "lucide-react"
import type { LoadingSpinnerProps } from "../types/types"

export default function LoadingSpinner({ 
  text = "Cargando...", 
  size = "medium" 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8", 
    large: "w-12 h-12"
  }

  const textSizes = {
    small: "text-xs",
    medium: "text-sm",
    large: "text-base"
  }

  const paddings = {
    small: "py-4",
    medium: "py-8",
    large: "py-12"
  }

  return (
    <div className={`flex flex-col items-center justify-center ${paddings[size]}`}>
      <RefreshCw 
        className={`${sizeClasses[size]} text-blue-500 animate-spin mb-2`}
        aria-hidden="true"
      />
      <p className={`text-gray-400 ${textSizes[size]} text-center`}>
        {text}
      </p>
    </div>
  )
}

// Variantes especializadas para casos comunes
export function LoadingCard() {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-xl animate-pulse">
      <div className="text-center">
        <div className="w-24 h-24 bg-gray-700 rounded-full mx-auto mb-4"></div>
        <div className="h-6 bg-gray-700 rounded w-32 mx-auto mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-20 mx-auto mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-28 mx-auto mb-4"></div>
        <div className="h-8 bg-gray-700 rounded w-24 mx-auto"></div>
      </div>
    </div>
  )
}

export function LoadingGrid({ count = 8 }: { count?: number }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <LoadingCard key={index} />
      ))}
    </ul>
  )
}
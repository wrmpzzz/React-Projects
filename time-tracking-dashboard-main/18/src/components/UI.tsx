// components/UI.tsx
import React from 'react';

export const LoadingScreen: React.FC = () => (
  <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
      <p className="text-slate-300">Cargando datos...</p>
    </div>
  </div>
);

interface ErrorScreenProps {
  error: string;
  onRetry?: () => void;
}

export const ErrorScreen: React.FC<ErrorScreenProps> = ({ error, onRetry }) => (
  <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
    <div className="text-center">
      <div className="text-red-500 text-6xl mb-4">⚠️</div>
      <h2 className="text-2xl font-bold mb-2">Error al cargar datos</h2>
      <p className="text-slate-300 mb-4">{error}</p>
      {onRetry && (
        <button 
          onClick={onRetry} 
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors"
        >
          Reintentar
        </button>
      )}
    </div>
  </div>
);

export const EmptyState: React.FC = () => (
  <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
    <div className="text-center">
      <div className="text-slate-500 text-6xl mb-4">📊</div>
      <h2 className="text-2xl font-bold mb-2">No hay datos disponibles</h2>
      <p className="text-slate-300">
        Verifica que el archivo data.json esté en la carpeta public/
      </p>
    </div>
  </div>
);
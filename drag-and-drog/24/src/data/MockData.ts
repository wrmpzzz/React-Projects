import type { Column } from "../types";

export const mockColumns: Column[] = [
  {
    id: 'todo',
    title: 'Por Hacer',
    color: 'bg-gradient-to-br from-slate-700 to-slate-800 border-slate-600',
    icon: '📋',
    tasks: [
      {
        id: '1',
        title: 'Diseñar mockups',
        description: 'Crear diseños para la nueva funcionalidad',
        priority: 'high'
      },
      {
        id: '2',
        title: 'Configurar base de datos',
        description: 'Instalar y configurar PostgreSQL',
        priority: 'medium'
      }
    ]
  },
  {
    id: 'progress',
    title: 'En Progreso',
    color: 'bg-gradient-to-br from-amber-600 to-orange-700 border-amber-500',
    icon: '⚡',
    tasks: [
      {
        id: '3',
        title: 'Implementar autenticación',
        description: 'Sistema de login con JWT',
        priority: 'high'
      }
    ]
  },
  {
    id: 'review',
    title: 'En Revisión',
    color: 'bg-gradient-to-br from-blue-600 to-indigo-700 border-blue-500',
    icon: '🔍',
    tasks: [
      {
        id: '4',
        title: 'Testing de API',
        description: 'Pruebas unitarias y de integración',
        priority: 'medium'
      }
    ]
  },
  {
    id: 'done',
    title: 'Completado',
    color: 'bg-gradient-to-br from-emerald-600 to-teal-700 border-emerald-500',
    icon: '✅',
    tasks: [
      {
        id: '5',
        title: 'Setup inicial del proyecto',
        description: 'Configuración de React y dependencias',
        priority: 'low'
      }
    ]
  }
];
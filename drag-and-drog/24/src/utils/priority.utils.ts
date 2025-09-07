// utils/priority.utils.ts

import type { Priority } from "../types";


export const getPriorityColor = (priority: Priority): string => {
  switch (priority) {
    case 'high':
      return 'bg-red-500';
    case 'medium':
      return 'bg-yellow-500';
    case 'low':
      return 'bg-green-500';
    default:
      return 'bg-gray-500';
  }
};

export const getPriorityIcon = (priority: Priority): string => {
  switch (priority) {
    case 'high':
      return '🔴';
    case 'medium':
      return '🟡';
    case 'low':
      return '🟢';
    default:
      return '⚪';
  }
};

export const getPriorityLabel = (priority: Priority): string => {
  switch (priority) {
    case 'high':
      return 'Alta Prioridad';
    case 'medium':
      return 'Media Prioridad';
    case 'low':
      return 'Baja Prioridad';
    default:
      return 'Sin Prioridad';
  }
};
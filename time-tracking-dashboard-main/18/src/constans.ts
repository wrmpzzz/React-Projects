// constants/index.ts
import type { Period, ActivityConfig } from './types';

export const PERIOD_LABELS: Record<Period, string> = {
  daily: 'Ayer',
  weekly: 'La semana pasada',
  monthly: 'El mes pasado'
};

export const PERIOD_BUTTONS: Array<{ key: Period; label: string }> = [
  { key: 'daily', label: 'Diario' },
  { key: 'weekly', label: 'Semanal' },
  { key: 'monthly', label: 'Mensual' }
];

export const ACTIVITY_CONFIGS: Record<string, ActivityConfig> = {
  'Work': { icon: '💼', color: 'work' },
  'Play': { icon: '🎮', color: 'play' },
  'Study': { icon: '📚', color: 'study' },
  'Exercise': { icon: '💪', color: 'exercise' },
  'Social': { icon: '👥', color: 'social' },
  'Self Care': { icon: '🧘', color: 'self-care' }
};

export const TITLE_TRANSLATIONS: Record<string, string> = {
  'Work': 'Trabajo',
  'Play': 'Juegos',
  'Study': 'Estudio',
  'Exercise': 'Ejercicio',
  'Social': 'Social',
  'Self Care': 'Cuidado Personal'
};

export const COLOR_CLASSES: Record<string, string> = {
  work: 'from-orange-400 to-orange-500',
  play: 'from-blue-400 to-blue-500',
  study: 'from-red-400 to-red-500',
  exercise: 'from-green-400 to-green-500',
  social: 'from-purple-400 to-purple-500',
  'self-care': 'from-yellow-400 to-yellow-500'
};
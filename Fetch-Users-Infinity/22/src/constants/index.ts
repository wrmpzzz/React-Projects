// constants/index.ts - Constantes centralizadas
export const API_CONFIG = {
    BASE_URL: 'https://randomuser.me/api/',
    RESULTS_PER_PAGE: 12,
    STALE_TIME: 1000 * 60 * 5, // 5 minutos
  } as const
  
  export const QUERY_KEYS = {
    USERS: ['users'],
  } as const
  
  export const SCROLL_CONFIG = {
    THRESHOLD: 0,
    ROOT_MARGIN: '200px',
    TRIGGER_ONCE: false,
  } as const
  
  export const LOADING_MESSAGES = {
    INITIAL: 'Cargando usuarios...',
    MORE: 'Cargando más usuarios...',
    ERROR: 'Error al cargar usuarios',
    RETRY: 'Reintentar',
    NO_MORE: 'No hay más usuarios para cargar',
    NOT_FOUND: 'No se encontraron usuarios con ese criterio',
    NO_USERS: 'No hay usuarios cargados',
    LOAD_USERS: 'Cargar usuarios',
  } as const
  
  export const BUTTON_TITLES = {
    DELETE_ALL: 'Elimina todos los usuarios pero mantiene las páginas cargadas',
    DELETE_AND_RESET: 'Elimina todos y vuelve a página 1',
    RESET: 'Trae usuarios completamente nuevos, solo página 1',
    RELOAD: 'Recarga desde cero, página 1',
    RESET_PAGES: (pages: number) => `Trae usuarios nuevos manteniendo ${pages} páginas`,
  } as const
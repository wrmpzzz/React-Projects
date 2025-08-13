import { ACTIVITY_CONFIGS } from '../constans';
import type { Activity, ActivityConfig } from '../types'


export const getActivityConfig = (title: string): ActivityConfig => {
  return ACTIVITY_CONFIGS[title] || { icon: '⏰', color: 'work' };
};

export const fetchTimeTrackingData = async (): Promise<Activity[]> => {
    const response = await fetch('/data.json')

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }

    return response.json()
}
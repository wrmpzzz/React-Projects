import { useEffect, useState } from 'react';
import type { Activity } from '../types';

interface UseTimeTrackingDataResult {
  data: Activity[];
  loading: boolean;
  error: string | null;
}

export const useTimeTrackingData = (): UseTimeTrackingDataResult => {
  const [data, setData] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/data.json');
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const jsonData: Activity[] = await response.json();
        setData(jsonData);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
        setError(errorMessage);
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, loading, error };
};
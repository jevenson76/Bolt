import { useState, useEffect } from 'react';
import { useSupabase } from '../contexts/SupabaseContext';

interface ApiQuery {
  method: string;
  path: string;
  duration: number;
  timestamp: number;
}

export function useApiDebug() {
  const supabase = useSupabase();
  const [queries, setQueries] = useState<ApiQuery[]>([]);
  const [errors, setErrors] = useState<Error[]>([]);

  useEffect(() => {
    const interceptor = supabase.rest.interceptors.response.use(
      (response) => {
        setQueries(prev => [...prev, {
          method: response.config.method?.toUpperCase() || 'UNKNOWN',
          path: response.config.url || '',
          duration: Date.now() - response.config.timestamp,
          timestamp: Date.now()
        }].slice(-5));
        return response;
      },
      (error) => {
        setErrors(prev => [...prev, error].slice(-5));
        return Promise.reject(error);
      }
    );

    return () => {
      supabase.rest.interceptors.response.remove(interceptor);
    };
  }, [supabase]);

  return { queries, errors };
}
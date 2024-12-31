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
    const handleRequest = (config: any) => {
      const timestamp = Date.now();
      setQueries(prev => [...prev.slice(-4), {
        method: config.method?.toUpperCase() || 'UNKNOWN',
        path: config.url || '',
        duration: 0,
        timestamp
      }]);
    };

    const handleError = (error: Error) => {
      setErrors(prev => [...prev.slice(-4), error]);
    };

    // Add listeners for debugging
    supabase.auth.onAuthStateChange(() => {
      handleRequest({ method: 'AUTH', url: '/auth/state-change' });
    });

    return () => {
      // Cleanup if needed
    };
  }, [supabase]);

  return { queries, errors };
}
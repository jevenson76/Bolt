import { useState, useCallback } from 'react';

export function useDebugState() {
  const [states, setStates] = useState<Record<string, unknown>>({});

  const addState = useCallback((key: string, value: unknown) => {
    setStates(prev => ({ ...prev, [key]: value }));
  }, []);

  return { states, addState };
}
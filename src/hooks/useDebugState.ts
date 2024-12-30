import { useState, useEffect } from 'react';

export function useDebugState() {
  const [states, setStates] = useState<Record<string, unknown>>({});

  const addState = (key: string, value: unknown) => {
    setStates(prev => ({ ...prev, [key]: value }));
  };

  return { states, addState };
}
import React from 'react';
import { useAuth } from '../../hooks/useAuth';

export function AuthDebug() {
  const { user, loading, error, isAuthenticated } = useAuth();

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-gray-700">Authentication</h4>
      <div className="text-xs font-mono space-y-1">
        <p>Status: {loading ? 'Loading...' : (isAuthenticated ? 'Authenticated' : 'Not Authenticated')}</p>
        {user && <p>User: {user.email}</p>}
        {error && <p className="text-red-600">Error: {error.message}</p>}
      </div>
    </div>
  );
}
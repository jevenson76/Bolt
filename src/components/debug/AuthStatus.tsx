import React from 'react';
import { useAuth } from '../../hooks/useAuth';

export function AuthStatus() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="fixed top-0 right-0 m-4 p-4 bg-white shadow-lg rounded-lg z-50">
        <p className="text-sm font-mono">Loading auth state...</p>
      </div>
    );
  }

  return (
    <div className="fixed top-0 right-0 m-4 p-4 bg-white shadow-lg rounded-lg z-50">
      <p className="text-sm font-mono">
        Status: {user ? `Logged in as ${user.email}` : 'Not Logged In'}
      </p>
    </div>
  );
}
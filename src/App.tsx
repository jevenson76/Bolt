import React from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { HomeContent } from './components/home/HomeContent';
import { InventoryDashboard } from './components/inventory/InventoryDashboard';
import { useAuth } from './hooks/useAuth';

export default function App() {
  console.log('App rendering');
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <MainLayout>
      <HomeContent />
      {user && <InventoryDashboard />}
    </MainLayout>
  );
}
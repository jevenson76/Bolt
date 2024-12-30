import React from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { HomeContent } from './components/home/HomeContent';
import { InventoryDashboard } from './components/inventory/InventoryDashboard';
import { DebugPanel } from './components/debug/DebugPanel';
import { useAuth } from './hooks/useAuth';

export default function App() {
  const { user } = useAuth();
  
  return (
    <>
      <DebugPanel />
      <MainLayout>
        <div className="min-h-screen bg-gray-50">
          <HomeContent />
          {user && <InventoryDashboard />}
        </div>
      </MainLayout>
    </>
  );
}
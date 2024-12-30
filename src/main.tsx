import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SupabaseProvider } from './contexts/SupabaseContext';
import { SearchProvider } from './components/search/SearchProvider';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

createRoot(rootElement).render(
  <StrictMode>
    <SupabaseProvider>
      <SearchProvider>
        <App />
      </SearchProvider>
    </SupabaseProvider>
  </StrictMode>
);
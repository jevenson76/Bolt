import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SupabaseProvider } from './contexts/SupabaseContext';
import { SearchProvider } from './components/search/SearchProvider';
import { ErrorBoundary } from './components/ErrorBoundary';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Failed to find root element');
}

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <ErrorBoundary>
      <SupabaseProvider>
        <SearchProvider>
          <App />
        </SearchProvider>
      </SupabaseProvider>
    </ErrorBoundary>
  </StrictMode>
);
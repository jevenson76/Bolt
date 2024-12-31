import React from 'react';

export function InitializationDebug() {
  return (
    <div className="fixed top-0 left-0 m-4 p-4 bg-white/90 shadow-lg rounded-lg z-50">
      <pre className="text-xs font-mono">
        {`Initialization Log:
- Root element: ${!!document.getElementById('root')}
- Supabase URL: ${!!import.meta.env.VITE_SUPABASE_URL}
- Supabase Key: ${!!import.meta.env.VITE_SUPABASE_ANON_KEY}
        `}
      </pre>
    </div>
  );
}
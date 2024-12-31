import React from 'react';

export function highlightText(text: string, query: string): JSX.Element {
  if (!query.trim()) {
    return <>{text}</>;
  }

  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  
  return (
    <>
      {parts.map((part, index) => (
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={index} className="bg-yellow-100 text-gray-900">{part}</mark>
        ) : (
          <span key={index}>{part}</span>
        )
      ))}
    </>
  );
}
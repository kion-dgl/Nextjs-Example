// app/page.tsx
'use client';

import React, { useState } from 'react';

const Home: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [apiMessage, setApiMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchApiMessage = async () => {
    setApiMessage(null);
    setError(null);

    try {
      const response = await fetch(`/api/fetchUserData?username=${encodeURIComponent(name)}`);

      if (response.status === 404) {
        throw new Error('Name not found (404)');
      }

      if (!response.ok) {
        throw new Error('Failed to fetch');
      }

      const data = await response.json();
      setApiMessage(data.message);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Welcome to Next.js with TypeScript!</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        style={{
          padding: '0.5rem',
          marginBottom: '1rem',
          fontSize: '1rem',
          border: '1px solid #ccc',
          borderRadius: '0.25rem',
        }}
      />
      <br />
      <button
        onClick={fetchApiMessage}
        style={{
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          cursor: 'pointer',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '0.25rem',
        }}
      >
        Fetch API Message
      </button>
      {apiMessage && <p>API Response: {apiMessage}</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </main>
  );
};

export default Home;

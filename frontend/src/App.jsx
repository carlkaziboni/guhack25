import React, { useState } from 'react';
import Landing from './components/Landing';

function App() {
  const [started, setStarted] = useState(false);

  return (
    <div className="w-full h-screen">
      {!started ? (
        <Landing onStart={() => setStarted(true)} />
      ) : (
        <div className="flex items-center justify-center h-full">
          <h2 className="text-3xl text-[#007bbe]">Chatbot coming soon...</h2>
        </div>
      )}
    </div>
  );
}

export default App

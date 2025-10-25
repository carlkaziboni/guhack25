import React from 'react';

export default function Landing({ onStart }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#99dfef] to-white">
      <h1 className="text-5xl font-bold text-[#007bbe] mb-4">Welcome to PathFinder</h1>
      <p className="text-gray-700 mb-6 text-lg">Discover your career path in a fun, interactive way!</p>
      <button
        onClick={onStart}
        className="bg-[#face03] hover:bg-yellow-400 text-black font-semibold py-3 px-6 rounded-xl shadow-md transition-transform hover:scale-105"
      >
        Start Chat
      </button>
    </div>
  );
}
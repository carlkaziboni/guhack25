import React, { useState } from "react";
import Landing from "./components/Landing";
import DoorSelection from "./components/DoorSelection";

function App() {
  const [currentRoom, setCurrentRoom] = useState("landing");

  const handleStart = () => {
    setCurrentRoom("hallway");
  };

  const handleEnterDoor = (doorId) => {
    console.log("Entered door:", doorId);
    setCurrentRoom(doorId);
  };

  const handleBackToHallway = () => {
    setCurrentRoom("hallway");
  };

  return (
    <div className="w-full h-screen">
      {currentRoom === "landing" && (
        <Landing onStart={handleStart} />
      )}
      {currentRoom === "hallway" && (
        <DoorSelection onEnterDoor={handleEnterDoor} />
      )}
      {currentRoom !== "landing" && currentRoom !== "hallway" && (
        <div className="flex flex-col items-center justify-center h-full bg-gray-900 text-white">
          <h2 className="text-4xl font-bold mb-4 capitalize">
            Welcome to the {currentRoom} room!
          </h2>
          <p className="text-xl mb-8 text-gray-300">(Coming soon...)</p>
          <button
            onClick={handleBackToHallway}
            className="bg-[#face03] hover:bg-yellow-400 text-black font-semibold py-3 px-6 rounded-xl shadow-md transition-transform hover:scale-105"
          >
            ← Back to Hallway
          </button>
        </div>
      )}
    </div>
  );
}

export default App;

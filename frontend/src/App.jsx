import React, { useState, useEffect } from "react";
import Landing from "./components/Landing";
import Sprite from "./Sprite";

function App() {
  const [started, setStarted] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isMoving, setIsMoving] = useState(false); // new state for movement
  const step = 5;       // pixels per keypress
  const sprintStep = 12; // pixels per keypress while moving

  useEffect(() => {
    const keys = new Set();

    const handleKeyDown = (e) => {
      if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","w","a","s","d"].includes(e.key)) {
        keys.add(e.key);
        setIsMoving(true); // trigger sprint animation

        setPosition((prev) => {
          const moveStep = sprintStep; // always use sprintStep when moving
          switch (e.key) {
            case "ArrowUp":
            case "w":
              return { ...prev, y: Math.max(prev.y - moveStep, 0) };
            case "ArrowDown":
            case "s":
              return { ...prev, y: Math.min(prev.y + moveStep, window.innerHeight - 36) };
            case "ArrowLeft":
            case "a":
              return { ...prev, x: Math.max(prev.x - moveStep, 0) };
            case "ArrowRight":
            case "d":
              return { ...prev, x: Math.min(prev.x + moveStep, window.innerWidth - 36) };
            default:
              return prev;
          }
        });
      }
    };

    const handleKeyUp = (e) => {
      keys.delete(e.key);
      if (![...keys].some((k) => ["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","w","a","s","d"].includes(k))) {
        setIsMoving(false); // stop sprint animation if no movement keys are pressed
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div className="w-full h-screen">
      {!started ? (
        <Landing onStart={() => setStarted(true)} />
      ) : (
        <div className="relative w-full h-full bg-gray-800 overflow-hidden">
          {/* Sprite moves whenever keys are pressed */}
          <Sprite x={position.x} y={position.y} isSprinting={isMoving} />

          {/* Centered text */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h2 className="text-3xl text-[#007bbe]">Chatbot coming soon...</h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

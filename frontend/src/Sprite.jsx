import React, { useState, useEffect } from "react";

export default function Sprite({ x = 100, y = 100, isSprinting = false }) {
  const frameWidth = 36;
  const frameHeight = 36;

  const sprintSequence = [
    { frame: 0, row: 6 }, // idle → start
    { frame: 1, row: 6 }, // start sprint
    { frame: 1, row: 8 }, // full sprint
    { frame: 2, row: 8 }, // sprint recovery
    { frame: 2, row: 6 }, // mid sprint
    // (0,6), (1, 6), (1,8), (2, 8), (2,6)
  ];

  const walkFrameCount = 6;
  const walkRow = 0;

  const [currentFrame, setCurrentFrame] = useState(0);
  const [sprintIndex, setSprintIndex] = useState(0);

  useEffect(() => {
    let interval;
    if (isSprinting) {
      interval = setInterval(() => {
        setSprintIndex((i) => (i + 1) % sprintSequence.length);
      }, 100);
    } else {
      interval = setInterval(() => {
        setCurrentFrame((f) => (f + 1) % walkFrameCount);
      }, 150);
    }

    return () => clearInterval(interval);
  }, [isSprinting]);

  const bgX = isSprinting
    ? -sprintSequence[sprintIndex].frame * frameWidth
    : -currentFrame * frameWidth;

  const bgY = isSprinting
    ? -sprintSequence[sprintIndex].row * frameHeight
    : -walkRow * frameHeight;

  return (
    <div
      style={{
        position: "absolute",
        top: y,
        left: x,
        width: `${frameWidth}px`,
        height: `${frameHeight}px`,
        imageRendering: "pixelated",
        backgroundImage: "url('/spritesheet.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: `${bgX}px ${bgY}px`,
        transform: "scale(4)",
        transformOrigin: "top left",
      }}
    />
  );
}

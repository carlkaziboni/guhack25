import { useState, useEffect } from "react";

export default function Sprite({ x = 100, y = 100, isSprinting = false, direction = "right" }) {
  const frameWidth = 36;
  const frameHeight = 36;
  const scale = 4;

  const sprintSequence = [
    { frame: 0, row: 6 },
    { frame: 1, row: 6 },
    { frame: 1, row: 8 },
    { frame: 2, row: 8 },
    { frame: 2, row: 6 },
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
        width: `${frameWidth * scale}px`,
        height: `${frameHeight * scale}px`,
        overflow: "hidden",
        transform: `translate(-50%, -50%) scale(${direction === "left" ? -1 : 1}, 1)`,
        transformOrigin: "center center",
      }}
    >
      <div
        style={{
          width: `${frameWidth}px`,
          height: `${frameHeight}px`,
          backgroundImage: "url('/spritesheet.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: `${bgX}px ${bgY}px`,
          imageRendering: "pixelated",
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      />
    </div>
  );
}

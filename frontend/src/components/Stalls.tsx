import React from "react";

type StallsSpriteProps = {
  x?: number;
  y?: number;
  frameWidth?: number;
  frameHeight?: number;
  scale?: number;
  flipHorizontal?: boolean;
  playerX?: number;
  playerY?: number;
  onInteract?: () => void;
};

export default function Stalls({
  x = window.innerWidth / 2,
  y = window.innerHeight / 2,
  frameWidth = 36,
  frameHeight = 36,
  scale = 4,
  flipHorizontal = false,
  playerX = 0,
  playerY = 0,
  onInteract,
}: StallsSpriteProps) {
  const interactionDistance = 100; // pixels

  // Calculate distance between player and stall
  const distance = Math.sqrt(
    Math.pow(playerX - x, 2) + Math.pow(playerY - y, 2)
  );
  const isNear = distance < interactionDistance;

  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter" && isNear && onInteract) {
        onInteract();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isNear, onInteract]);

  const containerStyle: React.CSSProperties = {
    position: "fixed",
    left: x,
    top: y,
    transform: `translate(-50%, -50%) scaleX(${flipHorizontal ? -1 : 1})`,
    width: frameWidth * scale,
    height: frameHeight * scale,
    overflow: "hidden",
    zIndex: 10,
  };

  const spriteStyle: React.CSSProperties = {
    width: frameWidth,
    height: frameHeight,
    backgroundImage: "url('/stalls.png')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "0px 0px",
    imageRendering: "pixelated",
    transform: `scale(${scale})`,
    transformOrigin: "top left",
  };

  return (
    <div style={containerStyle}>
      <div style={spriteStyle} />
      {isNear && (
        <div
          style={{
            position: "absolute",
            top: -30,
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(0,0,0,0.7)",
            color: "white",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "12px",
            whiteSpace: "nowrap",
          }}
        >
          Press Enter
        </div>
      )}
    </div>
  );
}
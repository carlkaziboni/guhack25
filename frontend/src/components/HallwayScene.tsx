import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Environment, Stars } from '@react-three/drei';
import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import Hallway from './Hallway';
import Avatar from './Avatar';
import Door from './Door';

interface HallwaySceneProps {
  onDoorInteract: (doorType: string) => void;
}

const doorPositions = [
  { position: [-4, 0, -2] as [number, number, number], label: 'Internship', type: 'internship' },
  { position: [0, 0, -2] as [number, number, number], label: 'Upskill', type: 'upskill' },
  { position: [4, 0, -2] as [number, number, number], label: 'Graduate Job', type: 'graduate' },
];

export default function HallwayScene({ onDoorInteract }: HallwaySceneProps) {
  const [_, setAvatarPosition] = useState<THREE.Vector3 | null>(null);
  const [nearDoor, setNearDoor] = useState<string | null>(null);
  const avatarRef = useRef<THREE.Mesh>(null);

  // Track avatar position and check proximity to doors
  useEffect(() => {
    const interval = setInterval(() => {
      if (avatarRef.current) {
        const pos = avatarRef.current.position;
        setAvatarPosition(pos.clone());

        // Check if near any door
        let foundNearDoor = null;
        for (const door of doorPositions) {
          const distance = Math.sqrt(
            Math.pow(pos.x - door.position[0], 2) +
            Math.pow(pos.z - door.position[2], 2)
          );
          if (distance < 1.5) {
            foundNearDoor = door.type;
            break;
          }
        }
        setNearDoor(foundNearDoor);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleInteract = () => {
    if (nearDoor) {
      onDoorInteract(nearDoor);
    }
  };

  return (
    <div className="w-full h-screen relative">
      <Canvas shadows>
        {/* Camera */}
        <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={60} />

        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[0, 3, 0]} intensity={0.5} color="#ffd700" />

        {/* Environment */}
        <Environment preset="sunset" />
        
        {/* Stars */}
        <Stars
          radius={100}
          depth={50}
          count={1000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />

        {/* Scene components */}
        <Hallway />
        
        {doorPositions.map((door) => (
          <Door
            key={door.type}
            position={door.position}
            label={door.label}
            isNear={nearDoor === door.type}
          />
        ))}

        <group ref={avatarRef}>
          <Avatar onInteract={handleInteract} nearDoor={!!nearDoor} />
        </group>
      </Canvas>

      {/* Controls overlay */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm px-6 py-4 rounded-lg border border-yellow-400/30">
        <div className="text-center">
          <p className="text-yellow-400 font-semibold mb-2">Controls</p>
          <div className="text-gray-300 text-sm space-y-1">
            <p>Arrow Keys or WASD - Move</p>
            <p>ENTER - Interact with door</p>
            {nearDoor && (
              <p className="text-yellow-400 font-bold mt-2 animate-pulse">
                Press ENTER to enter!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AvatarProps {
  onInteract: () => void;
  nearDoor: boolean;
}

export default function Avatar({ onInteract, nearDoor }: AvatarProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [keys, setKeys] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    interact: false,
  });

  const moveSpeed = 0.1;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case 'arrowup':
        case 'w':
          setKeys((prev) => ({ ...prev, forward: true }));
          break;
        case 'arrowdown':
        case 's':
          setKeys((prev) => ({ ...prev, backward: true }));
          break;
        case 'arrowleft':
        case 'a':
          setKeys((prev) => ({ ...prev, left: true }));
          break;
        case 'arrowright':
        case 'd':
          setKeys((prev) => ({ ...prev, right: true }));
          break;
        case 'enter':
          if (nearDoor) {
            onInteract();
          }
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case 'arrowup':
        case 'w':
          setKeys((prev) => ({ ...prev, forward: false }));
          break;
        case 'arrowdown':
        case 's':
          setKeys((prev) => ({ ...prev, backward: false }));
          break;
        case 'arrowleft':
        case 'a':
          setKeys((prev) => ({ ...prev, left: false }));
          break;
        case 'arrowright':
        case 'd':
          setKeys((prev) => ({ ...prev, right: false }));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [nearDoor, onInteract]);

  useFrame(() => {
    if (!meshRef.current) return;

    // Movement logic
    if (keys.forward) {
      meshRef.current.position.z -= moveSpeed;
    }
    if (keys.backward) {
      meshRef.current.position.z += moveSpeed;
    }
    if (keys.left) {
      meshRef.current.position.x -= moveSpeed;
    }
    if (keys.right) {
      meshRef.current.position.x += moveSpeed;
    }

    // Boundary constraints
    meshRef.current.position.x = Math.max(-9, Math.min(9, meshRef.current.position.x));
    meshRef.current.position.z = Math.max(-4, Math.min(4, meshRef.current.position.z));
  });

  return (
    <group>
      {/* Avatar sphere */}
      <mesh ref={meshRef} position={[0, 0.5, 3]} castShadow>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial 
          color="#ffd700"
          emissive="#ffd700"
          emissiveIntensity={0.5}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* Avatar light */}
      {meshRef.current && (
        <pointLight
          position={[
            meshRef.current.position.x,
            meshRef.current.position.y,
            meshRef.current.position.z,
          ]}
          color="#ffd700"
          intensity={1}
          distance={3}
        />
      )}
    </group>
  );
}

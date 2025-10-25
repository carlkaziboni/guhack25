import { Text } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

interface DoorProps {
  position: [number, number, number];
  label: string;
  isNear: boolean;
}

export default function Door({ position, label, isNear }: DoorProps) {
  const doorRef = useRef<THREE.Mesh>(null);

  return (
    <group position={position}>
      {/* Door frame */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[1.5, 3, 0.1]} />
        <meshStandardMaterial 
          color={isNear ? 'gold' : '#4a3020'}
          roughness={0.8}
        />
      </mesh>

      {/* Door panel */}
      <mesh ref={doorRef} position={[0, 1.5, 0.06]} castShadow>
        <boxGeometry args={[1.3, 2.7, 0.05]} />
        <meshStandardMaterial 
          color={isNear ? "#8b4789" : "#5a3a52"}
          emissive={isNear ? "#8b4789" : "#000000"}
          emissiveIntensity={isNear ? 0.8 : 0}
          roughness={0.6}
          metalness={0.3}
        />
      </mesh>

      {/* Door handle */}
      <mesh position={[0.5, 1.5, 0.12]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial 
          color="#ffd700"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Label */}
      <Text
        position={[0, 3.2, 0]}
        fontSize={0.3}
        color={isNear ? "#ffd700" : "#ffffff"}
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>

      {/* Glow effect when near */}
      {isNear && (
        <>
          <pointLight
            position={[0, 1.5, 0.5]}
            color="#8b4789"
            intensity={2}
            distance={4}
          />
          {/* Pulsing outer glow */}
          <mesh position={[0, 1.5, 0.06]}>
            <boxGeometry args={[1.5, 2.9, 0.1]} />
            <meshStandardMaterial 
              color="#8b4789"
              emissive="#8b4789"
              emissiveIntensity={0.3}
              transparent
              opacity={0.3}
            />
          </mesh>
        </>
      )}

      {/* Interaction prompt */}
      {isNear && (
        <Text
          position={[0, 0.5, 0.5]}
          fontSize={0.2}
          color="#ffd700"
          anchorX="center"
          anchorY="middle"
        >
          Press ENTER
        </Text>
      )}
    </group>
  );
}

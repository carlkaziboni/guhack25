import { useRef } from 'react';
import * as THREE from 'three';

export default function Hallway() {
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial 
          color="#3d2817"
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 4, 0]}>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial 
          color="#1a1410"
          roughness={0.9}
        />
      </mesh>

      {/* Left Wall */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-10, 2, 0]} receiveShadow>
        <planeGeometry args={[10, 4]} />
        <meshStandardMaterial 
          color="#2a1f15"
          roughness={0.7}
        />
      </mesh>

      {/* Right Wall */}
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[10, 2, 0]} receiveShadow>
        <planeGeometry args={[10, 4]} />
        <meshStandardMaterial 
          color="#2a1f15"
          roughness={0.7}
        />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 2, -5]} receiveShadow>
        <planeGeometry args={[20, 4]} />
        <meshStandardMaterial 
          color="#1f1610"
          roughness={0.8}
        />
      </mesh>

      {/* Window 1 - Left Wall */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-9.9, 2.5, -2]}>
        <planeGeometry args={[1.5, 1]} />
        <meshStandardMaterial 
          color="#4a90e2"
          emissive="#4a90e2"
          emissiveIntensity={0.5}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Window 2 - Left Wall */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-9.9, 2.5, 2]}>
        <planeGeometry args={[1.5, 1]} />
        <meshStandardMaterial 
          color="#4a90e2"
          emissive="#4a90e2"
          emissiveIntensity={0.5}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Window glow lights */}
      <pointLight position={[-9, 2.5, -2]} color="#4a90e2" intensity={0.5} distance={3} />
      <pointLight position={[-9, 2.5, 2]} color="#4a90e2" intensity={0.5} distance={3} />
    </group>
  );
}

import { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface AvatarProps {
  onInteract: () => void
  onPositionChange: (pos: THREE.Vector3) => void // ✅ new prop
  nearDoor: boolean
}

export default function Avatar({
  onInteract,
  nearDoor,
  onPositionChange,
}: AvatarProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [keys, setKeys] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  })

  const moveSpeed = 0.1

  // Keyboard handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case 'arrowup':
        case 'w':
          setKeys((prev) => ({ ...prev, forward: true }))
          break
        case 'arrowdown':
        case 's':
          setKeys((prev) => ({ ...prev, backward: true }))
          break
        case 'arrowleft':
        case 'a':
          setKeys((prev) => ({ ...prev, left: true }))
          break
        case 'arrowright':
        case 'd':
          setKeys((prev) => ({ ...prev, right: true }))
          break
        case 'enter':
          if (nearDoor) onInteract()
          break
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case 'arrowup':
        case 'w':
          setKeys((prev) => ({ ...prev, forward: false }))
          break
        case 'arrowdown':
        case 's':
          setKeys((prev) => ({ ...prev, backward: false }))
          break
        case 'arrowleft':
        case 'a':
          setKeys((prev) => ({ ...prev, left: false }))
          break
        case 'arrowright':
        case 'd':
          setKeys((prev) => ({ ...prev, right: false }))
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [nearDoor, onInteract])

  // Update position & report to parent
  useFrame(() => {
    if (!meshRef.current) return
    const mesh = meshRef.current

    // Movement
    if (keys.forward) mesh.position.z -= moveSpeed
    if (keys.backward) mesh.position.z += moveSpeed
    if (keys.left) mesh.position.x -= moveSpeed
    if (keys.right) mesh.position.x += moveSpeed

    // Boundaries
    mesh.position.x = Math.max(-9, Math.min(9, mesh.position.x))
    mesh.position.z = Math.max(-4, Math.min(4, mesh.position.z))

    // 🔥 Notify parent of new position
    onPositionChange(mesh.position.clone())
  })

  return (
    <group>
      {/* Avatar sphere with attached light */}
      <mesh ref={meshRef} position={[0, 0.5, 3]} castShadow>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="#ffd700"
          emissive="#ffd700"
          emissiveIntensity={0.5}
          roughness={0.3}
          metalness={0.7}
        />

        {/* ✅ Attach light directly to the mesh */}
        <pointLight color="#ffd700" intensity={1} distance={3} castShadow />
      </mesh>
    </group>
  )
}

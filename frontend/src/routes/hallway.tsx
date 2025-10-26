import { createFileRoute, useRouter } from '@tanstack/react-router'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, Environment, Stars } from '@react-three/drei'
import Hallway from '@/components/Hallway.tsx'
import Avatar from '@/components/Avatar.tsx'
import Door from '@/components/Door.tsx'
import '@/styles/index.css'
import * as THREE from 'three'
import { useState } from 'react'

const doorPositions: {
  position: [number, number, number]
  label: string
  type: string
}[] = [
  { position: [-4, 0, -2], label: 'Internship', type: 'internship' },
  { position: [0, 0, -2], label: 'Upskill', type: 'upskill' },
  { position: [4, 0, -2], label: 'Graduate Job', type: 'graduate' },
]

export const Route = createFileRoute('/hallway')({
  component: RouteComponent,
})

function RouteComponent() {
  const [_, setPlayerPos] = useState(new THREE.Vector3())
  const [nearDoor, setNearDoor] = useState<string | null>(null)
  const router = useRouter()

  const handlePositionChange = (pos: THREE.Vector3) => {
    setPlayerPos(pos)

    const threshold = 1.5
    let foundDoor: string | null = null

    for (const door of doorPositions) {
      const distance = pos.distanceTo(new THREE.Vector3(...door.position))
      if (distance < threshold) {
        foundDoor = door.type
        break
      }
    }

    setNearDoor((prev) => (prev !== foundDoor ? foundDoor : prev))
  }

  const handleDoorInteract = () => {
    if (nearDoor) {
      router.navigate({ to: `/${nearDoor}` })
    }
  }

  return (
    <div className="w-full h-screen relative">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={60} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
        <Environment preset="sunset" />
        <Stars radius={100} depth={50} count={1000} factor={4} fade speed={1} />

        <Hallway />

        {doorPositions.map((door) => (
          <Door
            key={door.type}
            position={door.position}
            label={door.label}
            isNear={nearDoor === door.type}
          />
        ))}

        <Avatar
          onPositionChange={handlePositionChange}
          onInteract={handleDoorInteract}
          nearDoor={!!nearDoor}
        />
      </Canvas>

      {/* HUD */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm px-6 py-4 rounded-lg border border-yellow-400/30">
        <div className="text-center">
          <p className="text-yellow-400 font-semibold mb-2">Controls</p>
          <div className="text-gray-300 text-sm space-y-1">
            <p>Arrow Keys or WASD - Move</p>
            <p>ENTER - Interact with door</p>
            {nearDoor && (
              <p className="text-yellow-400 font-bold mt-2 animate-pulse">
                Press ENTER to enter {nearDoor}!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

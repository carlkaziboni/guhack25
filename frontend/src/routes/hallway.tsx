import { createFileRoute } from '@tanstack/react-router'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, Environment, Stars } from '@react-three/drei'
import Hallway from '@/components/Hallway.jsx'
import Avatar from '@/components/Avatar.jsx'
import Door from '@/components/Door.jsx'
import '@/styles/index.css'
import { useState } from 'react'

const doorPositions = [
  { position: [-4, 0, -2], label: 'Internship', type: 'internship' },
  { position: [0, 0, -2], label: 'Upskill', type: 'upskill' },
  { position: [4, 0, -2], label: 'Graduate Job', type: 'graduate' },
]

export const Route = createFileRoute('/hallway')({
  component: RouteComponent,
})

function RouteComponent() {
  const [nearDoor, setNearDoor] = useState(null)

  const handleDoorInteract = () => {
    if (nearDoor) {
      alert(`You selected: ${nearDoor}`)
      // This would trigger the warp transition and go to chat
    }
  }

  return (
    <div className="w-full h-screen relative">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={60} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
        <pointLight position={[0, 3, 0]} intensity={0.5} color="#ffd700" />
        <Environment preset="sunset" />
        <Stars
          radius={100}
          depth={50}
          count={1000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />

        <Hallway />

        {doorPositions.map((door) => (
          <Door
            key={door.type}
            position={door.position}
            label={door.label}
            isNear={nearDoor === door.type}
          />
        ))}

        <Avatar onInteract={handleDoorInteract} nearDoor={!!nearDoor} />
      </Canvas>

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

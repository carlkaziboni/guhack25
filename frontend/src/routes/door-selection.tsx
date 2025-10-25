import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/door-selection')({
  component: RouteComponent,
})

function RouteComponent() {
  const [position, setPosition] = useState(0) // avatar horizontal position (px)
  const [selectedDoor, setSelectedDoor] = useState(null)
  const router = useRouter()

  // Door configuration (extendable later)
  const doors = [
    {
      id: 'internship',
      label: 'Internship',
      color: 'bg-blue-400',
      path: '/internship',
    },
    {
      id: 'upskill',
      label: 'Upskill',
      color: 'bg-green-400',
      path: '/upskill',
    },
    {
      id: 'graduate',
      label: 'Graduate Job',
      color: 'bg-yellow-400',
      path: '/graduate',
    },
  ]

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') setPosition((p) => Math.max(p - 40, 0))
      if (e.key === 'ArrowRight') setPosition((p) => Math.min(p + 40, 400))
      if (e.key === 'Enter' && selectedDoor) {
        router.navigate({ to: selectedDoor.path })
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedDoor])

  // Determine which door the avatar is nearest
  useEffect(() => {
    const nearestIndex = Math.round(position / 200)
    setSelectedDoor(doors[nearestIndex] ? doors[nearestIndex] : null)
  }, [position])

  return (
    <div className="relative flex flex-col items-center justify-end h-screen w-full overflow-hidden bg-gradient-to-b from-purple-900 via-blue-900 to-indigo-900">
      <div className="absolute top-16 text-center">
        <h1 className="text-3xl font-bold text-white drop-shadow-lg">
          Choose what you want to dive into today
        </h1>
      </div>

      {/* Doors */}
      <div className="flex justify-center space-x-20 mb-24">
        {doors.map((door, index) => (
          <div
            key={door.id}
            className={`w-32 h-56 rounded-lg shadow-lg flex items-end justify-center text-white text-lg font-semibold transition-all duration-300 ${door.color} ${
              selectedDoor === door.id
                ? 'scale-110 brightness-110'
                : 'opacity-80'
            }`}
            style={{ marginLeft: index === 0 ? '0px' : '' }}
          >
            <span className="mb-2">{door.label}</span>
          </div>
        ))}
      </div>

      {/* Avatar */}
      <div
        className="absolute bottom-10 transition-all duration-300"
        style={{
          left: `calc(50% - 30px + ${position - 200}px)`,
          width: '60px',
          height: '60px',
        }}
      >
        <div className="w-full h-full bg-yellow-400 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
          <span className="text-2xl">🧑</span>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-2 left-4 text-white text-sm opacity-75">
        <p>Use ← → arrow keys to move, Enter to select</p>
      </div>
    </div>
  )
}

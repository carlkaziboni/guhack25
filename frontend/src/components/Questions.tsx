import { useState, useEffect } from 'react'
import Sprite from '@/components/Sprite.tsx'
import Stalls from '@/components/Stalls.tsx'
import '@/styles/questions.css'
import { useRouter } from '@tanstack/react-router'

export default function Questions() {
  const [position, setPosition] = useState({ x: 100, y: 100 })
  const [isMoving, setIsMoving] = useState(false)
  const [direction, setDirection] = useState('right') // 🧭 new state
  const sprintStep = 12
  const router = useRouter()

  const handleStallInteract = () => {
    router.navigate({ to: '/chat' })
  }

  useEffect(() => {
    const keys = new Set<string>()

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      if (
        [
          'arrowup',
          'arrowdown',
          'arrowleft',
          'arrowright',
          'w',
          'a',
          's',
          'd',
        ].includes(key)
      ) {
        keys.add(key)
        setIsMoving(true)

        setPosition((prev) => {
          const moveStep = sprintStep

          switch (key) {
            case 'arrowup':
            case 'w':
              return { ...prev, y: Math.max(prev.y - moveStep, 0) }

            case 'arrowdown':
            case 's':
              return {
                ...prev,
                y: Math.min(prev.y + moveStep, window.innerHeight - 36),
              }

            case 'arrowleft':
            case 'a':
              setDirection('left') // 👈 flip sprite
              return { ...prev, x: Math.max(prev.x - moveStep, 0) }

            case 'arrowright':
            case 'd':
              setDirection('right') // 👉 normal sprite
              return {
                ...prev,
                x: Math.min(prev.x + moveStep, window.innerWidth - 36),
              }

            default:
              return prev
          }
        })
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      keys.delete(e.key.toLowerCase())
      if (
        ![...keys].some((k) =>
          [
            'arrowup',
            'arrowdown',
            'arrowleft',
            'arrowright',
            'w',
            'a',
            's',
            'd',
          ].includes(k),
        )
      ) {
        setIsMoving(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return (
    <div className="w-full h-screen">
      <div className="relative w-full h-full bg-gray-800 overflow-hidden">
        <Sprite
          x={position.x}
          y={position.y}
          isSprinting={isMoving}
          direction={direction}
        />
        <Stalls
          x={400}
          y={300}
          playerX={position.x}
          playerY={position.y}
          onInteract={handleStallInteract}
          flipHorizontal={false}
        />

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
    </div>
  )
}

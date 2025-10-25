import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Environment, Stars } from '@react-three/drei';
import Hallway from '@/components/Hallway.jsx';
import Avatar from '@/components/Avatar.jsx';
import Door from '@/components/Door.jsx';
import '@/styles/index.css'

const doorPositions = [
  { position: [-4, 0, -2], label: 'Internship', type: 'internship' },
  { position: [0, 0, -2], label: 'Upskill', type: 'upskill' },
  { position: [4, 0, -2], label: 'Graduate Job', type: 'graduate' },
];


export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [gameState, setGameState] = useState('landing');
  const [nearDoor, setNearDoor] = useState(null);

  const handleStart = () => {
    setGameState('hallway');
  };

  const handleDoorInteract = () => {
    if (nearDoor) {
      alert(`You selected: ${nearDoor}`);
      // This would trigger the warp transition and go to chat
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden index-route">
      {gameState === 'landing' && (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
          {/* Animated background particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-purple-400 to-yellow-400">
                PathFinder
              </h1>
              <p className="text-2xl text-purple-300 mb-8">
                Interactive Career Journey
              </p>
              <p className="text-lg text-gray-300 max-w-2xl mb-12">
                Step into an immersive 3D world where you explore different career pathways.
              </p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              className="px-12 py-4 text-2xl font-bold text-gray-900 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full shadow-2xl hover:shadow-yellow-400/50 transition-all duration-300"
            >
              Start Your Journey
            </motion.button>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="mt-16 text-gray-400 text-sm text-center"
            >
              <p>Best experienced with keyboard controls</p>
              <p className="mt-2">Use Arrow Keys or WASD to move • Enter to interact</p>
            </motion.div>
          </div>
        </div>
      )}
      
      {gameState === 'hallway' && (
        <div className="w-full h-screen relative">
          <Canvas shadows>
            <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={60} />
            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
            <pointLight position={[0, 3, 0]} intensity={0.5} color="#ffd700" />
            <Environment preset="sunset" />
            <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
            
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
      )}
    </div>
  );
}
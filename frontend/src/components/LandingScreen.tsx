import { motion } from 'framer-motion';

interface LandingScreenProps {
  onStart: () => void;
}

export default function LandingScreen({ onStart }: LandingScreenProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Animated background elements */}
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

      {/* Content */}
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
            Walk through the hallway, discover doors that lead to your future, and unlock
            your potential.
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="relative px-12 py-4 text-2xl font-bold text-gray-900 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full shadow-2xl hover:shadow-yellow-400/50 transition-all duration-300"
        >
          <span className="relative z-10">Start Your Journey</span>
          <motion.div
            className="absolute inset-0 rounded-full bg-yellow-300 blur-xl"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-16 text-gray-400 text-sm"
        >
          <p>Best experienced with keyboard controls</p>
          <p className="mt-2">Use Arrow Keys or WASD to move • Enter to interact</p>
        </motion.div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

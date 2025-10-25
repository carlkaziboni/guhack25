import { motion } from 'framer-motion';

interface WarpTransitionProps {
  onComplete: () => void;
}

export default function WarpTransition({ onComplete }: WarpTransitionProps) {
  return (
    <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none">
      {/* Multiple tunnel layers for depth */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border-4 border-purple-500"
          style={{
            background: 'radial-gradient(circle, rgba(139, 71, 137, 0.3), transparent)',
          }}
          initial={{ scale: 0, opacity: 0, rotate: 0 }}
          animate={{ 
            scale: [0, 1.5, 3], 
            opacity: [0, 1, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 1.5,
            delay: i * 0.1,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Light streaks */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`streak-${i}`}
          className="absolute w-1 h-20 bg-gradient-to-b from-yellow-400 via-purple-400 to-transparent"
          style={{
            left: `${Math.random() * 100}%`,
            top: '50%',
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ 
            y: [0, window.innerHeight],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 1.5,
            delay: Math.random() * 0.5,
            ease: "linear",
          }}
        />
      ))}

      {/* Center flash */}
      <motion.div
        className="absolute inset-0 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.8, 0] }}
        transition={{
          duration: 1.5,
          times: [0, 0.5, 1],
          ease: "easeInOut",
        }}
        onAnimationComplete={onComplete}
      />

      {/* Radial blur effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle, transparent 0%, rgba(139, 71, 137, 0.8) 50%, rgba(0, 0, 0, 1) 100%)',
        }}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 2, opacity: [0, 1, 0] }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
        }}
      />

      {/* Particle burst */}
      {[...Array(30)].map((_, i) => {
        const angle = (i / 30) * Math.PI * 2;
        const distance = 100 + Math.random() * 200;
        return (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full"
            style={{
              left: '50%',
              top: '50%',
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance,
              opacity: 0,
              scale: 0,
            }}
            transition={{
              duration: 1.5,
              ease: "easeOut",
            }}
          />
        );
      })}
    </div>
  );
}

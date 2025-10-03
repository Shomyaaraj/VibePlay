import React from 'react';
import { motion } from 'framer-motion';
import { Music } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="text-center">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
            scale: { duration: 1, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="inline-block mb-4"
        >
          <Music className="w-16 h-16 text-cyan-400" />
        </motion.div>
        <motion.div
          className="flex gap-2 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-cyan-400 rounded-full"
              animate={{
                y: [0, -10, 0],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
        <motion.p
          className="text-gray-400 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Loading music...
        </motion.p>
      </div>
    </div>
  );
};

export default LoadingSpinner;

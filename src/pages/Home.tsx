import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Play, Music, Headphones, Radio } from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-20 pb-32">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.2) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 80%, rgba(168, 85, 247, 0.2) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.2) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center pt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-6"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-cyan-500/30 blur-3xl rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <Music className="w-24 h-24 text-cyan-400 relative z-10" />
            </div>
          </motion.div>

          <motion.h1
            className="text-7xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Feel the Music
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover millions of songs, create playlists, and immerse yourself in a world of endless music
          </motion.p>

          <motion.button
            onClick={() => navigate('/browse')}
            className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-semibold text-lg shadow-2xl shadow-cyan-500/50 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05, boxShadow: '0 20px 50px rgba(6, 182, 212, 0.5)' }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Play className="w-6 h-6" fill="white" />
              Start Listening
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"
              initial={{ x: '100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-32"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {[
            {
              icon: Music,
              title: 'Vast Library',
              description: 'Access millions of songs across all genres',
              color: 'from-cyan-500 to-blue-500',
            },
            {
              icon: Headphones,
              title: 'High Quality',
              description: 'Crystal clear audio for the best experience',
              color: 'from-blue-500 to-purple-500',
            },
            {
              icon: Radio,
              title: 'Discover',
              description: 'Find new artists and tracks you will love',
              color: 'from-purple-500 to-pink-500',
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
              whileHover={{ y: -10 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl from-cyan-500/30 to-blue-500/30" />
              <div className="relative bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 group-hover:border-gray-600 transition-all duration-300">
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} mb-4`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Home;


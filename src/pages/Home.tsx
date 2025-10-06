import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Play, Music, Headphones, Radio, Sparkles, Users, TrendingUp, Globe, Heart, Zap } from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  const floatingAnimation = {
    y: [0, -20, 0],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  };

  const features = [
    { icon: Music, title: 'Vast Library', description: 'Access millions of songs across all genres', color: 'from-cyan-500 to-blue-500' },
    { icon: Headphones, title: 'High Quality', description: 'Crystal clear audio for the best experience', color: 'from-blue-500 to-purple-500' },
    { icon: Radio, title: 'Discover', description: 'Find new artists and tracks you will love', color: 'from-purple-500 to-pink-500' },
  ];

  const stats = [
    { icon: Users, value: '10M+', label: 'Active Users' },
    { icon: Music, value: '50M+', label: 'Songs' },
    { icon: TrendingUp, value: '1B+', label: 'Streams' },
    { icon: Globe, value: '180+', label: 'Countries' },
  ];

  const extraFeatures = [
    { icon: Heart, title: 'Personalized Playlists', description: 'Our AI learns your taste and creates perfect playlists just for you', gradient: 'from-pink-500 to-rose-500' },
    { icon: Zap, title: 'Lightning Fast', description: 'Instant playback with our optimized streaming technology', gradient: 'from-yellow-500 to-orange-500' },
  ];

  return (
    <div className="min-h-screen pt-20 pb-32 overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(6,182,212,0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(59,130,246,0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 80%, rgba(168,85,247,0.15) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400/30 rounded-full"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ y: [0, -30, 0], x: [0, Math.random() * 20 - 10, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-6 relative z-10">
        <motion.div className="max-w-4xl mx-auto text-center pt-20" style={{ opacity, scale }}>
          <motion.div className="inline-block mb-6 relative" animate={floatingAnimation}>
            <motion.div className="absolute inset-0 bg-cyan-500/30 blur-3xl rounded-full" animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
            <Music className="w-24 h-24 text-cyan-400 relative z-10" />

            {/* Orbiting Sparkles */}
            {[0, 120, 240].map((angle, i) => (
              <motion.div key={i} className="absolute" style={{ left: '50%', top: '50%' }} animate={{ rotate: [angle, angle + 360] }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}>
                <div style={{ transform: 'translate(-50%, -50%) translateY(-60px)' }}>
                  <Sparkles className="w-4 h-4 text-blue-400" />
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.h1 className="text-7xl md:text-8xl font-bold mb-6">
            <motion.span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent inline-block"
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: '200% 200%' }}
            >
              Feel the Music
            </motion.span>
          </motion.h1>

          <motion.p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Discover millions of songs, create playlists, and immerse yourself in a world of endless music
          </motion.p>

          <motion.button
            onClick={() => navigate('/browse')}
            className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-semibold text-lg shadow-2xl shadow-cyan-500/50 overflow-hidden"
            whileHover={{ scale: 1.05, boxShadow: '0 20px 50px rgba(6,182,212,0.5)' }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Play className="w-6 h-6" fill="white" />
              Start Listening
            </span>
          </motion.button>
        </motion.div>

        {/* Features Grid */}
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-32">
          {features.map((feature, index) => (
            <motion.div key={index} className="relative group" whileHover={{ y: -10 }}>
              <motion.div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl blur-xl`} animate={pulseAnimation} />
              <div className="relative bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 group-hover:border-gray-600 transition-all duration-300 h-full">
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} mb-4`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-32">
          {stats.map((stat, index) => (
            <motion.div key={index} className="relative group text-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.7 + index * 0.1 }}
              whileHover={{ scale: 1.05, borderColor: 'rgba(6,182,212,0.5)' }}
            >
              <motion.div animate={pulseAnimation}>
                <stat.icon className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
              </motion.div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Extra Features */}
        <motion.div className="max-w-5xl mx-auto mt-32 grid md:grid-cols-2 gap-8">
          {extraFeatures.map((item, index) => (
            <motion.div key={index} className="relative group p-8 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden"
              initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 2.2 + index * 0.2 }}
              whileHover={{ borderColor: 'rgba(6,182,212,0.5)' }}
            >
              <div className="flex items-start gap-4">
                <motion.div className={`p-3 rounded-lg bg-gradient-to-br ${item.gradient}`} whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                  <item.icon className="w-6 h-6 text-white" />
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.description}</p>
                </div>
              </div>
              <motion.div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${item.gradient}`} initial={{ width: 0 }} whileHover={{ width: '100%' }} transition={{ duration: 0.3 }} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Home;

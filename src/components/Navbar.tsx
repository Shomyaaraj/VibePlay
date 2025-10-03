import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Music2, Home, Search, List, Library } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/browse', label: 'Browse', icon: Library },
    { path: '/playlists', label: 'Playlists', icon: List },
    { path: '/search', label: 'Search', icon: Search },
    { path: '/trending', label: 'Trending', icon: Music2 },

  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-gray-800">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Music2 className="w-8 h-8 text-cyan-400" />
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              VibePlay
            </span>
          </Link>

          <div className="flex items-center space-x-1">
            {navItems.map(({ path, label, icon: Icon }) => {
              const active = isActive(path);
              return (
                <Link key={path} to={path}>
                  <motion.div
                    className={`relative px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                      active
                        ? 'text-cyan-400'
                        : 'text-gray-400 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{label}</span>
                    {active && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-cyan-400/10 rounded-lg border border-cyan-400/30"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

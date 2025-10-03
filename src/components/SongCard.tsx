import React from 'react';
import { motion } from 'framer-motion';
import { Play, Heart } from 'lucide-react';
import { Song } from '../data/musicData';
import { useMusic } from '../context/MusicContext';

interface SongCardProps {
  song: Song;
}

const SongCard: React.FC<SongCardProps> = ({ song }) => {
  const { playSong, toggleFavorite, isFavorite } = useMusic();

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer"
      whileHover={{ y: -8, scale: 1.02 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

      <div className="relative aspect-square overflow-hidden">
        <motion.img
          src={song.coverUrl}
          alt={song.album}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
        />

        <motion.button
          onClick={() => playSong(song)}
          className="absolute bottom-4 right-4 p-3 bg-cyan-500 rounded-full shadow-lg shadow-cyan-500/50 opacity-0 group-hover:opacity-100 z-20"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Play className="w-5 h-5 text-white" fill="white" />
        </motion.button>

        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(song.id);
          }}
          className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 z-20"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ y: -20 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            animate={isFavorite(song.id) ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite(song.id) ? 'fill-red-500 text-red-500' : 'text-white'
              }`}
            />
          </motion.div>
        </motion.button>
      </div>

      <div className="p-4 relative z-10">
        <h3 className="font-semibold text-white truncate group-hover:text-cyan-400 transition-colors">
          {song.title}
        </h3>
        <p className="text-sm text-gray-400 truncate">{song.artist}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-gray-500 bg-gray-700/50 px-2 py-1 rounded">
            {song.genre}
          </span>
          <span className="text-xs text-gray-500">{formatDuration(song.duration)}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default SongCard;

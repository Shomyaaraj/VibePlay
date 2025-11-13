import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Play, Clock } from 'lucide-react';
import { useMusic } from '../context/MusicContext';

interface ApiSong {
  id: string;
  name: string;
  primaryArtists: string;
  image: { url: string }[];
  downloadUrl: { url: string }[];
}

interface ApiPlaylist {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  songs: ApiSong[];
}

const playlistQueries = [
  { id: 'best-hits', name: 'Best Hits', description: 'Top trending songs from Saavn', query: 'best',coverUrl: 'https://images.pexels.com/photos/14812289/pexels-photo-14812289.jpeg'  },
  { id: 'Gym', name: 'GYM Motivation', description: 'enhance your workout', query: 'workout hindi', coverUrl:'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg' },
  { id: 'party', name: 'Party Mix', description: 'High energy party songs', query: 'party', 
    coverUrl: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg'
   },
  { id: 'romantic', name: 'Romantic', description: 'Love songs to set the mood', query: 'romantic', coverUrl: 'https://images.pexels.com/photos/412295/pexels-photo-412295.jpeg'},
  { id: 'Telugu', name: 'telugu', description: 'Telugu songs', query: 'telegu', coverUrl: 'https://imgs.search.brave.com/c4R46IxVihy6cn2FSWlfUrTMzr1gr8KIz9eSm9VDbis/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDEwNTQz/MjE1LmpwZw' },
];

const Playlists: React.FC = () => {
  const [playlists, setPlaylists] = useState<ApiPlaylist[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);
  const { playSong } = useMusic();

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const results: ApiPlaylist[] = [];

       for (const playlist of playlistQueries) {
  const res = await fetch(`https://saavn.dev/api/search/songs?query=${playlist.query}`);
  const data = await res.json();

  if (data?.data?.results?.length) {
    results.push({
      id: playlist.id,
      name: playlist.name,
      description: playlist.description,
      coverUrl: playlist.coverUrl || data.data.results[0]?.image?.[0]?.url || '',
      songs: data.data.results.slice(0, 50),
    });
  }
}


        setPlaylists(results);
      } catch (err) {
        console.error('Error fetching playlists:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  const getPlaylistSongs = (playlistId: string) => {
    const playlist = playlists.find((p) => p.id === playlistId);
    return playlist?.songs || [];
  };

  const getTotalDuration = (playlistId: string) => {
    const playlistSongs = getPlaylistSongs(playlistId);
 
    const totalSeconds = playlistSongs.reduce((sum, song) => sum + 200, 0);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  if (loading) {
    return (
      <div className="text-center text-gray-400 mt-20 text-lg">
        🎶 Loading playlists...
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-32">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Playlists</h1>
          <p className="text-gray-400 text-lg mb-8">Curated collections for every mood</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            {playlists.map((playlist, index) => (
              <motion.div
                key={playlist.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`group relative bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border cursor-pointer transition-all ${
                  selectedPlaylist === playlist.id
                    ? 'border-cyan-500 shadow-lg shadow-cyan-500/20'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
                onClick={() => setSelectedPlaylist(selectedPlaylist === playlist.id ? null : playlist.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-4 p-4">
                  <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                    <img src={playlist.coverUrl} alt={playlist.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-white truncate group-hover:text-cyan-400 transition-colors">{playlist.name}</h3>
                    <p className="text-sm text-gray-400 line-clamp-2 mb-2">{playlist.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Music className="w-3 h-3" />
                        {playlist.songs.length} tracks
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {getTotalDuration(playlist.id)}
                      </span>
                    </div>
                  </div>

                  <motion.div
                    className={`w-12 h-12 flex items-center justify-center rounded-full bg-cyan-500 shadow-lg shadow-cyan-500/50 ${
                      selectedPlaylist === playlist.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Play className="w-5 h-5 text-white" fill="white" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Selected Playlist Tracks */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <AnimatePresence mode="wait">
              {selectedPlaylist ? (
                <motion.div
                  key={selectedPlaylist}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Tracks</h2>
                  <div className="space-y-2">
                    {getPlaylistSongs(selectedPlaylist).map((song, index) => (
                      <motion.div
                        key={song.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="group flex items-center gap-4 p-3 rounded-lg hover:bg-gray-700/50 cursor-pointer transition-colors"
                        onClick={() =>
                          playSong({
                            id: song.id,
                            title: song.name,
                            artist: song.primaryArtists || 'Unknown Artist',
                            coverUrl: song.image?.[0]?.url || '',
                            duration: 200, // fallback
                            url: song.downloadUrl?.[0]?.url || '',
                          })
                        }
                        whileHover={{ x: 4 }}
                      >
                        <span className="text-gray-500 text-sm w-6">{index + 1}</span>
                        <img src={song.image?.[0]?.url || ''} alt={song.name} className="w-12 h-12 rounded object-cover" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-white truncate group-hover:text-cyan-400 transition-colors">{song.name}</h4>
                          <p className="text-sm text-gray-400 truncate">{song.primaryArtists}</p>
                        </div>
                        <span className="text-sm text-gray-500">3:20</span>
                        <motion.div className="opacity-0 group-hover:opacity-100" initial={{ scale: 0 }} whileHover={{ scale: 1 }}>
                          <Play className="w-5 h-5 text-cyan-400" />
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-12 border border-gray-700 text-center"
                >
                  <div className="inline-flex p-6 bg-gray-700/50 rounded-full mb-4">
                    <Music className="w-12 h-12 text-gray-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Select a Playlist</h3>
                  <p className="text-gray-400">Click on a playlist to view its tracks</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playlists;

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Song, songs as allSongs } from '../data/musicData';

interface MusicContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  volume: number;
  favorites: Set<string>;
  playSong: (song: Song) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
  setCurrentTime: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleFavorite: (songId: string) => void;
  isFavorite: (songId: string) => boolean;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(70);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const playSong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    setCurrentTime(0);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    if (!currentSong) return;
    const currentIndex = allSongs.findIndex(s => s.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % allSongs.length;
    playSong(allSongs[nextIndex]);
  };

  const playPrevious = () => {
    if (!currentSong) return;
    const currentIndex = allSongs.findIndex(s => s.id === currentSong.id);
    const prevIndex = currentIndex === 0 ? allSongs.length - 1 : currentIndex - 1;
    playSong(allSongs[prevIndex]);
  };

  const toggleFavorite = (songId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(songId)) {
        newFavorites.delete(songId);
      } else {
        newFavorites.add(songId);
      }
      return newFavorites;
    });
  };

  const isFavorite = (songId: string) => favorites.has(songId);

  return (
    <MusicContext.Provider
      value={{
        currentSong,
        isPlaying,
        currentTime,
        volume,
        favorites,
        playSong,
        togglePlay,
        playNext,
        playPrevious,
        setCurrentTime,
        setVolume,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};

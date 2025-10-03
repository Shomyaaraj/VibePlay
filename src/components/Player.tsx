import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Heart,
} from "lucide-react";
import { useMusic } from "../context/MusicContext";

const Player: React.FC = () => {
  const {
    currentSong,
    isPlaying,
    currentTime,
    volume,
    togglePlay,
    playNext,
    playPrevious,
    setCurrentTime,
    setVolume,
    toggleFavorite,
    isFavorite,
    setDuration,
  } = useMusic();

  const [showVolume, setShowVolume] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [audioDuration, setAudioDuration] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Load new song into audio element
  useEffect(() => {
    setAudioError(null);
    if (audioRef.current && currentSong?.url) {
      audioRef.current.src = currentSong.url;
      if (isPlaying) {
        audioRef.current.play().catch((err) => {
          setAudioError("Playback failed. Please interact with the player.");
        });
      }
    }
    if (currentSong?.duration) {
      setAudioDuration(currentSong.duration);
    }
  }, [currentSong]);

  // Play / Pause logic
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch((err) => {
        setAudioError("Playback failed. Please interact with the player.");
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Sync volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  // Update current time
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(Math.floor(audioRef.current.currentTime));
    }
  };

  // Update duration from audio metadata
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      const duration = Math.floor(audioRef.current.duration);
      setAudioDuration(duration);
      // If you also want to sync with global context:
      if (setDuration) setDuration(duration);
    }
  };

  // Handle playback errors
  const handleAudioError = () => {
    setAudioError("Could not play the song. Please try another track.");
  };

  // Seek progress bar
  const handleSeek = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!audioRef.current || !currentSong) return;
    const rect = (e.target as HTMLDivElement).getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const duration = audioDuration || currentSong.duration || 1;
    const newTime = (clickX / rect.width) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  if (!currentSong) return null;

  const formatTime = (seconds: number) => {
    if (!seconds || Number.isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const duration = audioDuration || currentSong.duration || 1;
  const progress = (currentTime / duration) * 100;

  return (
    <>
      {/* Audio Element */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={playNext}
        onError={handleAudioError}
      />

      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-t border-gray-700 backdrop-blur-xl"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5" />

        <div className="relative container mx-auto px-6 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Song Info */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <motion.img
                src={currentSong.coverUrl}
                alt={currentSong.title}
                className="w-14 h-14 rounded-lg shadow-lg object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              <div className="min-w-0 flex-1">
                <h4 className="font-semibold text-white truncate">
                  {currentSong.title}
                </h4>
                <p className="text-sm text-gray-400 truncate">
                  {currentSong.artist}
                </p>
              </div>
              <motion.button
                onClick={() => toggleFavorite(currentSong.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2"
              >
                <motion.div
                  animate={
                    isFavorite(currentSong.id) ? { scale: [1, 1.3, 1] } : {}
                  }
                  transition={{ duration: 0.3 }}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isFavorite(currentSong.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400"
                    }`}
                  />
                </motion.div>
              </motion.button>
            </div>

            {/* Controls */}
            <div className="flex flex-col items-center flex-1 max-w-2xl">
              <div className="flex items-center gap-4 mb-2">
                <motion.button
                  onClick={playPrevious}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <SkipBack className="w-5 h-5 text-white" />
                </motion.button>

                <motion.button
                  onClick={togglePlay}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-cyan-500 hover:bg-cyan-400 rounded-full transition-colors shadow-lg shadow-cyan-500/50"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 text-white" fill="white" />
                  ) : (
                    <Play className="w-6 h-6 text-white" fill="white" />
                  )}
                </motion.button>

                <motion.button
                  onClick={playNext}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <SkipForward className="w-5 h-5 text-white" />
                </motion.button>
              </div>

              {/* Progress Bar */}
              <div className="flex items-center gap-3 w-full">
                <span className="text-xs text-gray-400 w-10 text-right">
                  {formatTime(currentTime)}
                </span>
                <div
                  className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden group cursor-pointer"
                  onClick={handleSeek}
                >
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full relative"
                    style={{ width: `${progress}%` }}
                    layout
                  >
                    <motion.div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow-lg" />
                  </motion.div>
                </div>
                <span className="text-xs text-gray-400 w-10">
                  {formatTime(duration)}
                </span>
              </div>
              {audioError && (
                <div className="text-red-500 text-xs mt-1">{audioError}</div>
              )}
            </div>

            {/* Volume */}
            <div className="flex items-center gap-2 flex-1 justify-end">
              <div className="relative">
                <motion.button
                  onClick={() => setShowVolume(!showVolume)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  {volume === 0 ? (
                    <VolumeX className="w-5 h-5 text-white" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-white" />
                  )}
                </motion.button>

                <AnimatePresence>
                  {showVolume && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bottom-full right-0 mb-2 bg-gray-800 p-3 rounded-lg shadow-xl border border-gray-700"
                    >
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={(e) => setVolume(Number(e.target.value))}
                        className="w-24 h-1.5 bg-gray-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-cyan-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, rgb(6, 182, 212) ${volume}%, rgb(55, 65, 81) ${volume}%)`,
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <span className="text-sm text-gray-400 w-8">{volume}%</span>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Player;

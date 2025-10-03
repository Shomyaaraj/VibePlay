import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMusic } from "../context/MusicContext";

interface ApiSong {
  id: string;
  name: string;
  primaryArtists?: string;
  image?: { url: string }[];
  downloadUrl?: { url: string }[];
}

const Trending: React.FC = () => {
  const [songs, setSongs] = useState<ApiSong[]>([]);
  const [loading, setLoading] = useState(true);
  const { playSong } = useMusic();

  useEffect(() => {
    const fetchTrending = async () => {
      setLoading(true);
      try {
        // Use a popular keyword to fetch songs
        const trendingKeywords = ["best", "hit", "popular", "top"];
        let allSongs: ApiSong[] = [];

        for (let keyword of trendingKeywords) {
          const res = await fetch(
            `https://saavn.dev/api/search/songs?query=${encodeURIComponent(
              keyword
            )}&limit=15`
          );
          const data = await res.json();
          if (data?.data?.results) {
            allSongs = [...allSongs, ...data.data.results];
          }
        }

        // Remove duplicates by song id
        const uniqueSongs = Array.from(new Map(allSongs.map(s => [s.id, s])).values());
        setSongs(uniqueSongs);
      } catch (err) {
        console.error("Error fetching trending songs:", err);
        setSongs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-400 mt-20 text-lg">
        🎶 Loading trending songs...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold text-white mb-6">🔥 Trending Songs</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {songs.map((song) => (
          <motion.div
            key={song.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-800/60 rounded-xl p-4 hover:bg-gray-700/60 transition cursor-pointer"
            onClick={() =>
              playSong({
                id: song.id,
                title: song.name,
                artist: song.primaryArtists || "Unknown Artist",
                coverUrl:
                  song.image?.[2]?.url ||
                  song.image?.[1]?.url ||
                  song.image?.[0]?.url ||
                  "/placeholder.png",
                duration: 200,
                url: song.downloadUrl?.[0]?.url || "",
              })
            }
          >
            <img
              src={
                song.image?.[2]?.url ||
                song.image?.[1]?.url ||
                song.image?.[0]?.url ||
                "/placeholder.png"
              }
              alt={song.name}
              className="rounded-lg mb-3 w-full aspect-square object-cover shadow-lg"
            />
            <h4 className="text-white font-semibold truncate">{song.name}</h4>
            <p className="text-gray-400 text-sm truncate">
              {song.primaryArtists || "Unknown Artist"}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Trending;

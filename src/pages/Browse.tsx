import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMusic } from "../context/MusicContext";

interface ApiSong {
  id: string;
  name: string;
  primaryArtists?: string;
  image?: { url: string }[];
  downloadUrl?: { url: string }[];
}

const genres = ["Devotional", "Pop", "Rock", "Hip Hop", "Electronic", "Jazz", "Classical", "Bollywood"];

const Browse: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { playSong } = useMusic();

  const [selectedGenre, setSelectedGenre] = useState("Devotional");
  const [songs, setSongs] = useState<ApiSong[]>([]);
  const [loading, setLoading] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Fetch songs by genre
  const fetchSongsByGenre = async (genre: string) => {
    setLoading(true);
    try {
      const query = genre === "" ? "" : genre;
      const res = await fetch(
        `https://saavn.dev/api/search/songs?query=${encodeURIComponent(query)}&limit=20`
      );
      const data = await res.json();
      if (data?.data?.results) setSongs(data.data.results);
    } catch (err) {
      console.error("Error fetching songs:", err);
      setSongs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSongsByGenre(selectedGenre);
  }, [selectedGenre]);

  // Scroll handling
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      const newScrollLeft =
        scrollRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      scrollRef.current.scrollTo({ left: newScrollLeft, behavior: "smooth" });
    }
  };

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  return (
    <div className="min-h-screen pt-24 pb-32">
      <div className="container mx-auto px-6">
        {/* Page Title */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Browse Music</h1>
          <p className="text-gray-400 text-lg mb-8">Discover your next favorite track</p>
        </motion.div>

        {/* Genre buttons */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {genres.map((genre) => (
            <motion.button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                selectedGenre === genre
                  ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/50"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {genre}
            </motion.button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-gray-400 text-center text-lg mt-10">
            Loading...
          </div>
        )}

        {/* Songs */}
        {!loading && (
          <div className="relative">
            {canScrollLeft && (
              <motion.button
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/80 backdrop-blur-sm p-3 rounded-full shadow-xl border border-gray-700"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(6, 182, 212, 0.9)" }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </motion.button>
            )}

            {canScrollRight && (
              <motion.button
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/80 backdrop-blur-sm p-3 rounded-full shadow-xl border border-gray-700"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(6, 182, 212, 0.9)" }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </motion.button>
            )}

            <motion.div
              ref={scrollRef}
              onScroll={checkScroll}
              className="overflow-x-auto overflow-y-visible pb-4 scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <div className="flex gap-6 min-w-max px-2">
                {songs.map((song, i) => (
                  <motion.div
                    key={song.id}
                    className="w-64 flex-shrink-0 cursor-pointer"
                    onClick={() =>
                      playSong({
                        id: song.id,
                        title: song.name,
                        artist: song.primaryArtists || "Unknown Artist",
                        coverUrl:
                          song.image?.[2]?.url || song.image?.[1]?.url || song.image?.[0]?.url || "/placeholder.png",
                        duration: song.downloadUrl?.[0]?.url ? 200 : 0,
                        url: song.downloadUrl?.[0]?.url || "",
                      })
                    }
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    <img
                      src={song.image?.[2]?.url || song.image?.[1]?.url || song.image?.[0]?.url || "/placeholder.png"}
                      alt={song.name}
                      className="rounded-xl w-full aspect-square object-cover shadow-lg"
                    />
                    <p className="text-white font-semibold mt-2 truncate">{song.name}</p>
                    <p className="text-gray-400 text-sm truncate">{song.primaryArtists}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;

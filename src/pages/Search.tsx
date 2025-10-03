import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search as SearchIcon } from "lucide-react";
import { useMusic } from "../context/MusicContext";

interface ApiSong {
  id: string;
  name: string;
  primaryArtists: string;
  image: { url: string }[];
  downloadUrl: { url: string }[];
}

const Search: React.FC = () => {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState<ApiSong[]>([]);
  const [suggestions, setSuggestions] = useState<ApiSong[]>([]);
  const [loading, setLoading] = useState(false);
  const { playSong } = useMusic();

  // 🔁 Debounce search suggestions (fetch only after 500ms pause)
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.trim().length > 2) {
        fetchSuggestions(query);
      } else {
        setSuggestions([]);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [query]);

  // 🔎 Fetch search suggestions
  const fetchSuggestions = async (text: string) => {
    try {
      const res = await fetch(
        `https://saavn.dev/api/search/songs?query=${encodeURIComponent(text)}`
      );
      const data = await res.json();
      if (data?.data?.results) {
        setSuggestions(data.data.results.slice(0, 6)); // limit to top 6
      }
    } catch (err) {
      console.error("Suggestion fetch error:", err);
    }
  };

  // 🔍 Full search (on submit)
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://saavn.dev/api/search/songs?query=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      if (data?.data?.results) {
        setSongs(data.data.results);
      }
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
      setSuggestions([]); // hide suggestions after full search
    }
  };

  // 🪄 Play song directly from suggestions
  const handlePlayFromSuggestion = (song: ApiSong) => {
    playSong({
      id: song.id,
      title: song.name,
      artist: song.primaryArtists || "Unknown Artist",
      coverUrl: song.image?.[2]?.url || song.image?.[0]?.url,
      duration: 200,
      url: song.downloadUrl?.[0]?.url || "",
    });
    setSuggestions([]);
    setQuery(song.name);
  };

  return (
    <div className="container mx-auto px-6 py-8 relative">
      <h2 className="text-3xl font-bold text-white mb-6">🔍 Search Songs</h2>

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="relative flex items-center bg-gray-800 rounded-full px-4 py-2 mb-8"
      >
        <SearchIcon className="text-gray-400 w-5 h-5 mr-2" />
        <input
          type="text"
          placeholder="Search for songs, artists..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent flex-1 outline-none text-white placeholder-gray-500"
        />
        <button
          type="submit"
          className="bg-cyan-500 hover:bg-cyan-400 text-white px-5 py-2 rounded-full ml-2 transition"
        >
          Search
        </button>

        {/* 🔥 Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 bg-gray-900 border border-gray-700 rounded-lg shadow-lg mt-2 z-50 overflow-hidden"
          >
            {suggestions.map((song) => (
              <div
                key={song.id}
                onClick={() => handlePlayFromSuggestion(song)}
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800 cursor-pointer transition"
              >
                <img
                  src={song.image?.[1]?.url || song.image?.[0]?.url}
                  alt={song.name}
                  className="w-10 h-10 rounded-md object-cover"
                />
                <div>
                  <p className="text-white font-semibold text-sm truncate">
                    {song.name}
                  </p>
                  <p className="text-gray-400 text-xs truncate">
                    {song.primaryArtists || "Unknown Artist"}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </form>

      {/* Loader */}
      {loading && (
        <div className="text-gray-400 text-center mt-20 text-lg">
          🎶 Searching songs...
        </div>
      )}

      {/* Search Results */}
      {!loading && songs.length > 0 && (
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
                  coverUrl: song.image?.[2]?.url || song.image?.[0]?.url,
                  duration: 200,
                  url: song.downloadUrl?.[0]?.url || "",
                })
              }
            >
              <img
                src={song.image?.[2]?.url || song.image?.[0]?.url}
                alt={song.name}
                className="rounded-lg mb-3 w-full aspect-square object-cover shadow-lg"
              />
              <h4 className="text-white font-semibold truncate">
                {song.name}
              </h4>
              <p className="text-gray-400 text-sm truncate">
                {song.primaryArtists || "Unknown Artist"}
              </p>
            </motion.div>
          ))}
        </div>
      )}

      {/* No results */}
      {!loading && songs.length === 0 && query && (
        <div className="text-gray-400 text-center mt-10 text-lg">
          😔 No songs found. Try a different keyword.
        </div>
      )}
    </div>
  );
};

export default Search;

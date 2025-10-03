import { useState } from "react";
import { searchSongs } from "../services/api";

interface ApiSong {
  id: string;
  name: string;
  primaryArtists: string;
  image?: { link: string }[];
  downloadUrl?: { link: string }[];
}

interface SearchBarProps {
  onPlay: (song: ApiSong) => void;
}

export default function SearchBar({ onPlay }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ApiSong[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    try {
      const data = await searchSongs(query);
      setResults(data);
    } catch {
      setError("Failed to fetch songs");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          placeholder="Search for songs..."
          className="flex-1 p-2 border rounded-lg"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 rounded-lg">
          Search
        </button>
      </form>

      {loading && <p className="mt-2 text-gray-400">Loading...</p>}
      {error && <p className="mt-2 text-red-500">{error}</p>}

      {results.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {results.map((song) => (
            <div
              key={song.id}
              className="cursor-pointer bg-white rounded-xl p-3 shadow hover:shadow-lg transition"
              onClick={() => onPlay(song)}
            >
              <img
                src={song.image?.[2]?.link || song.image?.[0]?.link}
                alt={song.name}
                className="rounded-lg"
              />
              <h3 className="mt-2 font-semibold">{song.name}</h3>
              <p className="text-sm text-gray-500">{song.primaryArtists}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

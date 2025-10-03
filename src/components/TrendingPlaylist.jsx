// src/components/TrendingPlaylist.jsx
import { useEffect, useState } from "react";
import { getTrendingSongs } from "../services/api";

export default function TrendingPlaylist({ onPlay }) {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    getTrendingSongs().then(setSongs);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-3">🔥 Trending Songs</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {songs.map((song) => (
          <div
            key={song.id}
            className="cursor-pointer bg-white rounded-xl p-3 shadow hover:shadow-lg transition"
            onClick={() => onPlay(song)}
          >
            <img src={song.image?.[2]?.link} alt={song.name} className="rounded-lg" />
            <h3 className="mt-2 font-semibold">{song.name}</h3>
            <p className="text-sm text-gray-500">{song.primaryArtists}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

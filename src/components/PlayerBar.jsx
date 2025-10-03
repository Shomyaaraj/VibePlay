// src/components/PlayerBar.jsx
export default function PlayerBar({ currentSong }) {
  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-3">
        <img
          src={currentSong.image?.[1]?.link}
          alt={currentSong.name}
          className="w-12 h-12 rounded-lg"
        />
        <div>
          <h3 className="font-bold">{currentSong.name}</h3>
          <p className="text-sm text-gray-300">{currentSong.primaryArtists}</p>
        </div>
      </div>
      <audio controls autoPlay src={currentSong.downloadUrl?.[4]?.link} className="w-1/2" />
    </div>
  );
}

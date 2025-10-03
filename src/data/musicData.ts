export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  coverUrl: string;
  genre: string;
  releaseYear: number;
  audioUrl?: string; // 👈 Add this line
}


export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  songs: string[];
}

export const songs: Song[] = [
  {
    id: '1',
    title: 'Neon Dreams',
    artist: 'Electric Pulse',
    album: 'Synthetic Nights',
    duration: 245,
    coverUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800',
    genre: 'Electronic',
    releaseYear: 2024,
    audioUrl: '',

  },
  {
    id: '2',
    title: 'Midnight Drive',
    artist: 'Luna Waves',
    album: 'Highway Dreams',
    duration: 198,
    coverUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800',
    genre: 'Pop',
    releaseYear: 2024,
    audioUrl: '',

  },
  {
    id: '3',
    title: 'Urban Jungle',
    artist: 'City Beats',
    album: 'Concrete Paradise',
    duration: 212,
    coverUrl: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800',
    genre: 'Hip Hop',
    releaseYear: 2023,
    audioUrl: '',

  },
  {
    id: '4',
    title: 'Cosmic Voyage',
    artist: 'Stellar Sounds',
    album: 'Space Odyssey',
    duration: 278,
    coverUrl: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=800',
    genre: 'Ambient',
    releaseYear: 2024,
    audioUrl: '',

  },
  {
    id: '5',
    title: 'Summer Vibes',
    artist: 'Tropical Groove',
    album: 'Island Life',
    duration: 189,
    coverUrl: 'https://images.pexels.com/photos/1701595/pexels-photo-1701595.jpeg?auto=compress&cs=tinysrgb&w=800',
    genre: 'Pop',
    releaseYear: 2024,
    audioUrl: '',

  },
  {
    id: '6',
    title: 'Thunder Roll',
    artist: 'Rock Legends',
    album: 'Electric Storm',
    duration: 234,
    coverUrl: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=800',
    genre: 'Rock',
    releaseYear: 2023,
    audioUrl: '',

  },
  {
    id: '7',
    title: 'Silent Whispers',
    artist: 'Acoustic Soul',
    album: 'Quiet Moments',
    duration: 201,
    coverUrl: 'https://images.pexels.com/photos/1619654/pexels-photo-1619654.jpeg?auto=compress&cs=tinysrgb&w=800',
    genre: 'Acoustic',
    releaseYear: 2024,
    audioUrl: '',

  },
  {
    id: '8',
    title: 'Bass Drop',
    artist: 'DJ Nexus',
    album: 'Club Anthems',
    duration: 195,
    coverUrl: 'https://images.pexels.com/photos/1047442/pexels-photo-1047442.jpeg?auto=compress&cs=tinysrgb&w=800',
    genre: 'EDM',
    releaseYear: 2024,
    audioUrl: '',

  },
  {
    id: '9',
    title: 'Jazz Nights',
    artist: 'Smooth Quartet',
    album: 'Late Night Sessions',
    duration: 312,
    coverUrl: 'https://images.pexels.com/photos/3971985/pexels-photo-3971985.jpeg?auto=compress&cs=tinysrgb&w=800',
    genre: 'Jazz',
    releaseYear: 2023,
    audioUrl: '',

  },
  {
    id: '10',
    title: 'Digital Love',
    artist: 'Synth Wave',
    album: 'Retro Future',
    duration: 223,
    coverUrl: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800',
    genre: 'Synthwave',
    releaseYear: 2024,
    audioUrl: '',

  },
  {
    id: '11',
    title: 'Ocean Breeze',
    artist: 'Chill Masters',
    album: 'Relaxation Station',
    duration: 267,
    coverUrl: 'https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=800',
    genre: 'Chillout',
    releaseYear: 2024,
    audioUrl: '',

  },
  {
    id: '12',
    title: 'Fire Dance',
    artist: 'Latin Heat',
    album: 'Ritmo Caliente',
    duration: 188,
    coverUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800',
    genre: 'Latin',
    releaseYear: 2023,
    audioUrl: '',

  },
];

export const playlists: Playlist[] = [
  {
    id: 'p1',
    name: 'Chill Vibes',
    description: 'Perfect for relaxing and unwinding',
    coverUrl: 'https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=800',
    songs: ['2', '5', '7', '11'],
  },
  {
    id: 'p2',
    name: 'Workout Mix',
    description: 'High energy tracks to fuel your workout',
    coverUrl: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=800',
    songs: ['1', '3', '6', '8'],
  },
  {
    id: 'p3',
    name: 'Night Drive',
    description: 'Smooth beats for late night cruising',
    coverUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800',
    songs: ['2', '4', '9', '10'],
  },
  {
    id: 'p4',
    name: 'Party Starter',
    description: 'Get the party going with these bangers',
    coverUrl: 'https://images.pexels.com/photos/1047442/pexels-photo-1047442.jpeg?auto=compress&cs=tinysrgb&w=800',
    songs: ['3', '8', '12'],
  },
  {
    id: 'p5',
    name: 'Focus Flow',
    description: 'Background music for deep concentration',
    coverUrl: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=800',
    songs: ['4', '7', '9', '11'],
  },
];

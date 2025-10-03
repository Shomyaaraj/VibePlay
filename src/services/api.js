// src/services/api.js
import axios from "axios";

const API_BASE = "https://saavn.dev/api";

export const searchSongs = async (query) => {
  const res = await axios.get(`${API_BASE}/search/songs?query=${query}`);
  return res.data.data.results || [];
};

export const getTrendingSongs = async () => {
  const res = await axios.get(`${API_BASE}/search/songs?query=trending`);
  return res.data.data.results || [];
};

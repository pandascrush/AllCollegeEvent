import axios from "axios";

const apiUrl = "http://localhost:5000";

const api = axios.create({
  baseURL: apiUrl,
});

// Add token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;

import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: apiUrl,
});

// Add token automatically
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  console.log(token);
  
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;

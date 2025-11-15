import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("tms_token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default api;
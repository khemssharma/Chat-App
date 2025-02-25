import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api",
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

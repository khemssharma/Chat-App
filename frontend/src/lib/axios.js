import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://chat-app-tgbj.onrender.com/api",
  withCredentials: true,
});

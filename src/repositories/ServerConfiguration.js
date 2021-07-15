import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://test.enthic.fr",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

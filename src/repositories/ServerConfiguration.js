import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://enthic.auberge-tante-marie.fr/",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://test.enthic.fr",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  async getAPEScores(ape) {
    const url = `/statistics/${ape}`;
    let results = null;
    try {
      results = await apiClient.get(url);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log("getAPEScores trigger computation from server because error :", error);
        return apiClient.get(`/compute/ape/${ape}`);
      }
      console.log("getAPEScores Error", error);
    }
    return results ? results.data : null;
  },
};

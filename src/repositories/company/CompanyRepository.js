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
  async getCompanyDataBySiren(siren) {
    const url = `/company/siren/${siren}`;
    let results = null;
    try {
      results = await apiClient.get(url);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return null;
      }
      console.log("getCompanyDataBySiren Error", error);
    }
    return results ? results.data : null;
  },
  async triggerServerComputation(denomination, year) {
    const url = `/compute/${denomination}/${year}`;
    let results = null;
    try {
      await apiClient.get(url);
    } catch (error) {
      console.log("triggerServerComputation Error", error);
    }
    return results ? results.data : null;
  },
};

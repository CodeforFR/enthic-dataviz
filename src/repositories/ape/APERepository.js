import { apiClient } from "../ServerConfiguration";

export default {
  async getAPEScores(ape) {
    const url = `/statistics/${ape}`;
    let results = null;
    try {
      results = await apiClient.get(url);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log(
          "getAPEScores trigger computation from server because error :",
          error
        );
        return apiClient.get(`/compute/ape/${ape}`);
      }
      console.log("getAPEScores Error", error);
    }
    return results ? results.data : null;
  },
  async getAPECompanies(ape) {
    const url = `/company/ape/${ape}`;
    let results = null;
    try {
      results = await apiClient.get(url);
    } catch (error) {
      console.log("getAPECompanies Error", error);
    }
    return results ? results.data : null;
  },
};

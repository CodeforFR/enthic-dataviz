import { apiClient } from "../ServerConfiguration";

export default {
  async getTopOnBundle(bundle, year) {
    const url = `/top/${bundle}/${year}/dummy`;
    let results = null;
    try {
      results = await apiClient.get(url);
    } catch (error) {
      console.log("getTopOnBundle Error", error);
    }
    let response = results ? results.data : null;
    return response;
  },
};

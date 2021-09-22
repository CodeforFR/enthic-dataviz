import { apiClient } from "../ServerConfiguration";

export default {
  async searchCompaniesFromText(text) {
    const url = `/company/search/page?page=1&per_page=30&probe=${text}`;
    return this.searchCompaniesFromUrl(url);
  },
  async searchCompaniesFromUrl(url) {
    const results = await apiClient.get(url);
    return this.formatResult(results);
  },
  formatResult(results) {
    console.log("results from Enthic:", results);
    return results
      ? { ...results.data, member: null, items: results.data.member }
      : null;
  },
};

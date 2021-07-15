import { apiClient } from "../ServerConfiguration";

export default {
  searchCompaniesFromText(text) {
    const url = `/company/search/page?page=1&per_page=30&probe=${text}`;
    return this.searchCompaniesFromUrl(url);
  },
  async searchCompaniesFromUrl(url) {
    const results = await apiClient.get(url);
    return results ? results.data : null;
  },
};

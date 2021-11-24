import { apiClient } from "../ServerConfiguration";

export default {
  fields: {},
  readSortQuery(sortQuery) {
    if (!sortQuery) return null;
    return null;
  },
  async searchFirstPage(enthicSearchOptions) {
    const { text } = enthicSearchOptions;
    if (!text) return null;
    return this.searchCompaniesFromText(text);
  },
  async searchNextPage(enthicSearchOptions) {
    const { nextSearchUrl } = enthicSearchOptions;
    if (!nextSearchUrl) return null;
    return this.searchCompaniesFromUrl(nextSearchUrl);
  },
  async searchCompaniesFromText(text) {
    const url = `/company/search/page?page=1&per_page=30&probe=${text}`;
    return this.searchCompaniesFromUrl(url);
  },
  async searchCompaniesFromUrl(url) {
    const results = await apiClient.get(url);
    return this.formatResult(results);
  },
  async checkSirenExist(sirenList) {
    const results = await apiClient.get("/exist/siren/" + sirenList.join(","));
    return results.data;
  },
  formatResult(results) {
    console.log("results from Enthic:", results);
    return results
      ? { ...results.data, member: null, items: results.data.member }
      : null;
  },
};

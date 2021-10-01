import axios from "axios";

export const opendatasoftApiClient = axios.create({
  baseURL: "https://data.opendatasoft.com",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  fields: {
    FIELD_TRI_EFFECTIF: "trancheeffectifsunitelegaletriable",
    FIELD_TRI_DATE: "datecreationunitelegale",
  },
  readSortQuery(sortQuery) {
    if (!sortQuery) return null;
    try {
      const regexSort = new RegExp(
        `(?<order>-?)(?<field>${this.fields.FIELD_TRI_EFFECTIF}|${this.fields.FIELD_TRI_DATE})`
      );
      const match = regexSort.exec(sortQuery);
      if (!match) return null;
      return {
        field: match.groups.field,
        order: match.groups.order === "-" ? false : true,
      };
    } catch (error) {
      console.log("url regEx error", error);
    }

    return null;
  },
  async searchFirstPage(openDataSoftSearchOptions) {
    const { text, sort } = openDataSoftSearchOptions;
    if (!text) return null;
    const offset = 0;
    return this.searchCompaniesFromText(text, offset, sort);
  },
  async searchNextPage(openDataSoftSearchOptions) {
    const { text, offset, sort } = openDataSoftSearchOptions;
    if (!text) return null;
    if (!offset) throw Error("offset can't be empty for next page");
    return this.searchCompaniesFromText(text, offset, sort);
  },
  async searchCompaniesFromText(text, offset = 0, sort = null) {
    var url = `/api/records/1.0/search/?dataset=economicref-france-sirene-v3%40public&q=${text}&rows=30&refine.etablissementsiege=oui&refine.etatadministratifunitelegale=Active&start=${offset}`;
    if (sort) {
      url += "&sort=" + sort;
    }
    const results = await opendatasoftApiClient.get(url);

    return this.formatResult(results);
  },

  formatResult(results) {
    // console.log("results from OpenDataSoft:", results.data.records);
    return results
      ? { ...results.data, records: null, items: results.data.records }
      : null;
  },
};

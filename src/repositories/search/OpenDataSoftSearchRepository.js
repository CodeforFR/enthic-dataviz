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
  async searchCompaniesFromText(text, offset = 0, sort = null) {
    var url = `/api/records/1.0/search/?dataset=economicref-france-sirene-v3%40public&q=${text}&rows=30&refine.etablissementsiege=oui&refine.etatadministratifunitelegale=Active&start=${offset}`;
    if (sort) {
      url += "&sort=" + sort;
    }
    const results = await opendatasoftApiClient.get(url);
    return results ? results.data : null;
  },
};

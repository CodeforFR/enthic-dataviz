import { apiClient } from "../ServerConfiguration";

export default {
  getCompanyFinancialDataUrl(siren) {
    const url = `/csv/company/${siren}`;
    return apiClient.defaults.baseURL + url;
  },
  getApeFinancialDataUrl(ape) {
    const url = `/csv/ape/${ape}`;
    return apiClient.defaults.baseURL + url;
  },
};

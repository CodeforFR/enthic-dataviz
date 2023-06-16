import axios from "axios";

export const leBasicApi = axios.create({
  baseURL: "https://observatoire-filieres.azurewebsites.net/",
  //baseURL: "http://localhost:7071/",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  async getDataForCodeNAF(code_naf) {
    var url = `esane/?code_naf=${code_naf}`;
    const results = await leBasicApi.get(url);
    console.log("basic api returned", results);

    return results ? results.data : null;
  },
  async getOxfamData(regroupement_entreprises) {
    var indicateurs = [
      "Net sales (RO)",
      "Personnel Expenses (RO)",
      "Income taxes (RO)",
      "Net Profit (part of the group) (RO)",
      "Ordinary dividends (RO)",
      "Share buyback (RO)",
      "Number Of Employees (RO)",
      "Added value (RO)",
    ];
    var url = `oxfam/?regroupement=${regroupement_entreprises}`;
    const results = await leBasicApi.post(url, indicateurs);
    console.log("basic api returned", results);

    return results ? results.data : null;
  },
};

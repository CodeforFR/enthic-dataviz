import { calculateComptesDeResultats } from "./comptesDeResultats";
import { enhanceDeclaration } from "./financialDataRefined";
import { getFlatData } from "./flatData";

/**
 * Add comptes De Résultats
 */
const addAccountingCalculations = (companyData) => {
  return {
    ...companyData,
    comptesDeResultats: calculateComptesDeResultats(companyData.declarations),
    declaration: enhanceDeclaration(companyData.declarations),
    flatData: getFlatData(companyData),
  };
};

export default {
  addAccountingCalculations,
};

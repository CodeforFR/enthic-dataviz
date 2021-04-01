import { calculateComptesDeResultats } from "./comptesDeResultats";
import { enhanceDeclaration } from "./financialDataRefined";

/**
 * Add comptes De Résultats
 */
const addAccountingCalculations = (companyData) => {
  return {
    ...companyData,
    comptesDeResultats: calculateComptesDeResultats(companyData.declarations),
    declaration: enhanceDeclaration(companyData.declarations),
  };
};

export default {
  addAccountingCalculations,
};

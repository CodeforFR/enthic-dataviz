import { calculateComptesDeResultats } from "./comptesDeResultats";
import { enhanceDeclaration } from "./financialDataRefined";
import { getFlatData } from "./flatData";
import { getYearData } from "./yearData";

/**
 * Add comptes De Résultats
 */
const addAccountingCalculations = (companyData) => {
  if (!companyData) {
    // throw new Error("Entreprise non trouvé");
    return null;
  }

  return {
    ...companyData,
    comptesDeResultats: calculateComptesDeResultats(companyData.declarations),
    declaration: enhanceDeclaration(companyData.declarations),
    flatData: getFlatData(companyData),
    yearData: getYearData(companyData),
  };
};

export default {
  addAccountingCalculations,
};

import { calculateComptesDeResultats } from "./comptesDeResultats";
import { enhanceDeclaration } from "./financialDataRefined";

/**
 * Add comptes De Résultats
 */
const addAccountingCalculations = (companyData1) => {
  console.log("companyData1", companyData1);

  const { declarations } = companyData1;
  const companyData2 = {
    ...companyData1,
    comptesDeResultats: calculateComptesDeResultats(declarations),
    declaration: enhanceDeclaration(declarations),
  };
  console.log("companyData2", companyData2);
  return companyData2;
};

export default {
  addAccountingCalculations,
};

import { calculateComptesDeResultats } from "./comptesDeResultats";
import { enhanceDeclaration } from "./financialDataRefined";
import { getFlatData } from "./flatData";
import { getYearData } from "./yearData";
import { getLastEffectifFromYearData } from "./lastEffectif";

/**
 * Add comptes De Résultats
 */
const addAccountingCalculations = (companyData) => {
  if (!companyData) {
    // throw new Error("Entreprise non trouvé");
    return null;
  }
  const comptesDeResultats = calculateComptesDeResultats(
    companyData.declarations
  );
  const declaration = enhanceDeclaration(companyData.declarations);
  const flatData = getFlatData(companyData);
  const yearData = getYearData(companyData);

  const lastEffectif = getLastEffectifFromYearData(yearData);

  return {
    ...companyData,
    comptesDeResultats,
    declaration,
    flatData,
    yearData,
    lastEffectif,
  };
};

export default {
  addAccountingCalculations,
};

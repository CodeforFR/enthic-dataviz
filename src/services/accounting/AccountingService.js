import { calculateComptesDeResultats } from "./comptesDeResultats";

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

  return {
    ...companyData,
    comptesDeResultats,
  };
};

export default {
  addAccountingCalculations,
};

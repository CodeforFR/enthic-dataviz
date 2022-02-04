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

let formatter = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
});

const formatAmount = (amount) => {
  return formatter.format(amount);
};

export default {
  addAccountingCalculations,
  formatAmount,
};

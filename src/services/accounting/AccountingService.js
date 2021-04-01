import calculateComptesDeResultats from "./comptesDeResultats";

/**
 * Add comptes De Résultats
 */
const accountingTransformation1 = (companyData1) => {
  console.log("companyData1", companyData1);

  const companyData2 = companyData1;
  companyData2.comptesDeResultats = calculateComptesDeResultats(
    companyData1.declaration
  );

  console.log("companyData2", companyData2);
  return companyData2;
};

export default {
  accountingTransformation1,
};

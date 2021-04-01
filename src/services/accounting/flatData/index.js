const getFlatData = (companyData) => {
  const flatData = {};
  for (var property in companyData) {
    if (["siren", "ape", "postal_code", "town"].includes(property)) {
      flatData[property] = companyData[property];
    }
  }
  return flatData;
};

export { getFlatData };

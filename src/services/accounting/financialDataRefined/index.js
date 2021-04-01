const enhanceDeclaration = (declarations) => {
  if (!declarations) {
    return null;
  }
  const declarations2 = declarations;

  for (let d of declarations2) {
    d.financial_data_refined = {};
    for (var oneData of d.financial_data) {
      for (var property in oneData) {
        d.financial_data_refined[property] = oneData[property];
      }
    }
  }
  return declarations2;
};

export { enhanceDeclaration };

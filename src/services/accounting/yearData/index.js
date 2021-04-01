const getYearData = (companyData) => {
  var formatter = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 0,
  });
  const yearData = [];

  for (let enthicDeclaration of companyData.declarations) {
    console.log("enthicDeclaration", enthicDeclaration);
    let yearDataItem = {
      year: enthicDeclaration.declaration.value,
      data: {},
    };
    for (var yearProp in enthicDeclaration.financial_data_refined) {
      yearDataItem.data[yearProp] = {
        description:
          enthicDeclaration.financial_data_refined[yearProp].description,
        value: formatter.format(
          enthicDeclaration.financial_data_refined[yearProp].value
        ),
      };
    }
    yearData.push(yearDataItem);
  }
  return yearData;
};

export { getYearData };

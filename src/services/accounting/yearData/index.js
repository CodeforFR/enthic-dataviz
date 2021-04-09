const getYearData = (companyData) => {
  var formatter = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 0,
  });
  const yearData = [];

  for (let declaration of companyData.declarations) {
    let yearDataItem = {
      year: declaration.declaration.value,
      data: {},
    };
    for (var yearProp in declaration.financial_data_refined) {
      yearDataItem.data[yearProp] = {
        description: declaration.financial_data_refined[yearProp].description,
        value: formatter.format(
          declaration.financial_data_refined[yearProp].value
        ),
      };
    }
    yearData.push(yearDataItem);
  }
  return yearData;
};

export { getYearData };

const getLastEffectifFromYearData = (yearData) => {
  console.log(" - - DynamicDetail / computed / lastEffectif :", yearData);
  var lastEffectif = "Nombre de salarié⋅es non déclaré :-(";
  var lastYear = 0;
  for (var year of yearData) {
    if (year.year > lastYear && year.data.YP) {
      lastYear = year.year;
      lastEffectif =
        year.data.YP.value + " salarié⋅es en moyenne sur " + year.year;
    }
    console.log(" - - DynamicDetail / computed / lastEffectif :", year);
  }
  return lastEffectif;
};

export { getLastEffectifFromYearData };

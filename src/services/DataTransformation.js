/*
Recherche de la première année présente dans l'ensemble des séries de données passées en argument.
Une série est un objet de la forme :
{
  year1 : value1,
  ...
  yearN : valueN
}
*/
const getFirstCommonYear = (arrayOfSeries) => {
  var annePourBase100 = null;
  for (var year in arrayOfSeries[0]) {
    var yearInEachSeries = true;
    for (var i = 1; i < arrayOfSeries.length; ++i) {
      if (year in arrayOfSeries[i]) {
        continue;
      } else {
        yearInEachSeries = false;
        break;
      }
    }
    if (yearInEachSeries) {
      annePourBase100 = year;
      console.log(
        "getFirstCommonYear : annee pour base 100 trouvée :",
        annePourBase100
      );
      break;
    }
  }
  return annePourBase100;
};

const getAllExistingYear = (arrayOfSeries) => {
  // Liste des années disponibles
  var xAxisValues = new Set();
  for (var i = 0; i < arrayOfSeries.length; ++i) {
    for (var year in arrayOfSeries[i]) {
      xAxisValues.add(year);
    }
  }
  return Array.from(xAxisValues).sort();
};

export default {
  getFirstCommonYear,
  getAllExistingYear,
};

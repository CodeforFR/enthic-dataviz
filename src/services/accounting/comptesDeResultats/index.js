import { convertDataToTree } from "./FillArbreCompteDeResultat.js";
import { checkTreeData } from "./CheckAndCompleteCompteDeResultat.js";
import { computeScore } from "./ComputeCompanyYearScore.js";

const calculateComptesDeResultats = (declarations) => {
  if (!declarations) {
    return null;
  }

  var result = Object.entries(declarations).map(declarationToTree);
  return result.filter((element) => {
    return element !== null;
  });
};

const declarationToTree = ([year, declaration]) => {
  if (!declaration.financial_data) {
    return null;
  }
  var yearTree = convertDataToTree(declaration.financial_data);
  checkTreeData(yearTree);
  yearTree.scores = computeScore(yearTree);
  yearTree.year = year;
  return yearTree;
};

export { calculateComptesDeResultats };

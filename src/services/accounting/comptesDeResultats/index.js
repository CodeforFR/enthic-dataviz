import { convertDataToTree } from "./FillArbreCompteDeResultat.js";
import { checkTreeData } from "./CheckAndCompleteCompteDeResultat.js";
import { computeScore } from "./ComputeCompanyYearScore.js";

const calculateComptesDeResultats = (declarations) => {
  if (!declarations) {
    return null;
  }

  return Object.entries(declarations).map(declarationToTree);
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

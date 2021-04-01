import { convertDataToTree } from "./FillArbreCompteDeResultat.js";
import { checkTreeData } from "./CheckAndCompleteCompteDeResultat.js";
import { computeScore } from "./ComputeCompanyYearScore.js";

const calculateComptesDeResultats = (declarations) => {
  if (!declarations) {
    return null;
  }
  const comptesDeRésultats = declarations.map(declarationToTree);
  return comptesDeRésultats;
};

const declarationToTree = (declaration) => {
  var yearTree = convertDataToTree(declaration.financial_data);
  checkTreeData(yearTree);
  yearTree.scores = computeScore(yearTree);
  yearTree.year = declaration.declaration.value;
  return yearTree;
};

export default calculateComptesDeResultats;

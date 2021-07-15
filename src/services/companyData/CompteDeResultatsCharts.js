function cleanUndefinedDataForGraphicalDisplay(item, undefinedDataList, year) {
  if (isNaN(item.data.value)) {
    undefinedDataList.push(item.name + " non fournis pour l'année " + year);
    return 0;
  }
  return item.data.value;
}

function computeRatio(value, factor) {
  return Math.round((1000 * value) / factor) / 1000;
}

const calculateChartUnits = (comptesDeResultats) => {
  // Find perfect unit for CA graphic (€, k€ or M€)
  let beneficeItem = comptesDeResultats[0];
  if (!beneficeItem) {
    return null;
  }
  let factorCA = 1;
  let unitCA = "€";
  let CADeReference =
    beneficeItem.children.ResultatAvantImpot.children.ResultatExploitation
      .children.ProduitsExploitation.children.ChiffresAffairesNet.data.value;
  if (CADeReference == 0) {
    CADeReference =
      beneficeItem.children.ResultatAvantImpot.children.ResultatExploitation
        .children.ProduitsExploitation.data.value;
  }
  if (CADeReference > 10000000) {
    factorCA = 1000000;
    unitCA = "millions d'€";
  } else if (CADeReference > 300000) {
    factorCA = 1000;
    unitCA = "milliers d'€";
  }

  // Find perfect unit for margin graphic (€, k€ or M€)
  let factorMargin = 1;
  let unitMargin = "€";
  let resultatDeReference =
    beneficeItem.children.ResultatAvantImpot.children.ResultatExploitation.data
      .value;
  if (isNaN(resultatDeReference)) {
    resultatDeReference = beneficeItem.data.value;
  }
  if (resultatDeReference > 3000000 || resultatDeReference < -3000000) {
    factorMargin = 1000000;
    unitMargin = "millions d'€";
  } else if (resultatDeReference > 30000 || resultatDeReference < -100000) {
    factorMargin = 1000;
    unitMargin = "milliers d'€";
  }
  return {
    factorCA: factorCA,
    unitCA: unitCA,
    factorMargin: factorMargin,
    unitMargin: unitMargin,
  };
};

const calculateChartDetails = (comptesDeResultats) => {
  let units = calculateChartUnits(comptesDeResultats);

  let xLabels = [];

  let dataSeriesMargin = {
    resultatExceptionnelEtFinancier: [],
    Participation: [],
    ImpotsSurLesSocietes: [],
    resultatPourProprietaire: [],
  };

  let dataSeriesCA = {
    salaires: [],
    cotisationSociale: [],
    taxesMoinsSubventions: [],
    marchandisesTotalAfficher: [],
    autreChargesMoinsAutresProduitsAffiches: [],
    resultatExploitation: [],
  };
  let euroFormatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
  });
  let listOfUndisplayableData = [];
  let showResultatExploitation = true;
  let showTaxeVsSubvention = true;
  for (let i = 0; i < comptesDeResultats.length; i++) {
    xLabels.push(comptesDeResultats[i].year);

    // Local variables for code visibility
    let rootItem = comptesDeResultats[i];
    let resultExploit =
      rootItem.children.ResultatAvantImpot.children.ResultatExploitation;
    let produits = resultExploit.children.ProduitsExploitation;
    let charges = resultExploit.children.ChargesExploitation;

    // Get all needed values for first graphic (about Chiffre d'Affaire)
    let impotsEtAssimiles = cleanUndefinedDataForGraphicalDisplay(
      charges.children.ImpotTaxesEtVersementsAssimiles,
      listOfUndisplayableData,
      xLabels[i]
    );
    let subventions = cleanUndefinedDataForGraphicalDisplay(
      produits.children.SubventionsExploitation,
      listOfUndisplayableData,
      xLabels[i]
    );
    let achatMarchandises = cleanUndefinedDataForGraphicalDisplay(
      charges.children.AchatsDeMarchandises,
      listOfUndisplayableData,
      xLabels[i]
    );
    let variationMarchandises = cleanUndefinedDataForGraphicalDisplay(
      charges.children.VariationStockMarchandises,
      listOfUndisplayableData,
      xLabels[i]
    );
    let achatMatierePremiere = cleanUndefinedDataForGraphicalDisplay(
      charges.children.AchatMatierePremiereAutreAppro,
      listOfUndisplayableData,
      xLabels[i]
    );
    let variationMatierePremiere = cleanUndefinedDataForGraphicalDisplay(
      charges.children.VariationStockMatierePremiereEtAppro,
      listOfUndisplayableData,
      xLabels[i]
    );
    let salaire = cleanUndefinedDataForGraphicalDisplay(
      charges.children.SalairesEtTraitements,
      listOfUndisplayableData,
      xLabels[i]
    );
    let cotisation = cleanUndefinedDataForGraphicalDisplay(
      charges.children.ChargesSociales,
      listOfUndisplayableData,
      xLabels[i]
    );
    let resultatExploitation = cleanUndefinedDataForGraphicalDisplay(
      resultExploit,
      listOfUndisplayableData,
      xLabels[i]
    );

    // Affichage des taxes uniquement si elles sont supérieures aux subventions
    if (impotsEtAssimiles < subventions) {
      dataSeriesCA.taxesMoinsSubventions[i] = 0;
      listOfUndisplayableData.push(
        "subventions (" +
          euroFormatter.format(subventions) +
          ") supérieur aux taxes (" +
          euroFormatter.format(impotsEtAssimiles) +
          ") en " +
          xLabels[i]
      );
      showTaxeVsSubvention = false;
    } else {
      dataSeriesCA.taxesMoinsSubventions.push(impotsEtAssimiles - subventions);
    }

    // Display only if positive
    if (resultatExploitation < 0) {
      showResultatExploitation = false;
      resultatExploitation = 0;
      listOfUndisplayableData.push(
        "Résultat d'exploitation négatif en " + xLabels[i]
      );
    }

    // Compute other complexe data to display
    dataSeriesCA.marchandisesTotalAfficher.push(
      achatMarchandises +
        variationMarchandises +
        achatMatierePremiere +
        variationMatierePremiere
    );
    var yearGrandTotal = produits.children.ChiffresAffairesNet.data.value;
    if (yearGrandTotal == 0) {
      yearGrandTotal = produits.data.value;
      listOfUndisplayableData.push(
        produits.children.ChiffresAffairesNet.name +
          " nul (0) pour l'année " +
          xLabels[i] +
          " remplacé par " +
          produits.name
      );
    }
    dataSeriesCA.autreChargesMoinsAutresProduitsAffiches.push(
      yearGrandTotal -
        salaire -
        cotisation -
        dataSeriesCA.taxesMoinsSubventions[i] -
        dataSeriesCA.marchandisesTotalAfficher[i] -
        resultatExploitation
    );

    // Application du ratio pour l'affichage du graphe sur le CA
    dataSeriesCA.salaires.push(computeRatio(salaire, units.factorCA));
    dataSeriesCA.cotisationSociale.push(
      computeRatio(cotisation, units.factorCA)
    );
    dataSeriesCA.taxesMoinsSubventions[i] = computeRatio(
      dataSeriesCA.taxesMoinsSubventions[i],
      units.factorCA
    );
    dataSeriesCA.marchandisesTotalAfficher[i] = computeRatio(
      dataSeriesCA.marchandisesTotalAfficher[i],
      units.factorCA
    );
    dataSeriesCA.autreChargesMoinsAutresProduitsAffiches[i] = computeRatio(
      dataSeriesCA.autreChargesMoinsAutresProduitsAffiches[i],
      units.factorCA
    );
    dataSeriesCA.resultatExploitation.push(
      computeRatio(resultatExploitation, units.factorCA)
    );

    // Application du ratio pour l'affichage du graphe sur le résultat d'exploitation
    dataSeriesMargin.Participation.push(
      Math.round(
        (1000 *
          rootItem.children.ParticipationSalariesAuxResultats.data.value) /
          units.factorMargin
      ) / 1000
    );
    dataSeriesMargin.ImpotsSurLesSocietes.push(
      computeRatio(
        rootItem.children.ImpotsSurLesBenefices.data.value,
        units.factorMargin
      )
    );
    dataSeriesMargin.resultatPourProprietaire.push(
      computeRatio(rootItem.data.value, units.factorMargin)
    );
    dataSeriesMargin.resultatExceptionnelEtFinancier.push(
      Math.round(
        (1000 *
          (-rootItem.children.ResultatExceptionnel.data.value -
            rootItem.children.ResultatAvantImpot.children.ResultatFinancier.data
              .value)) /
          units.factorMargin
      ) / 1000
    );
  }

  // Build data series to pass to graphical plugin
  let seriesCA = [
    {
      name: "Autres charges retranchées des autres produits",
      data: dataSeriesCA.autreChargesMoinsAutresProduitsAffiches,
    },
    {
      name: "Salaires Bruts",
      data: dataSeriesCA.salaires,
    },
    {
      name: "Cotisations Sociales",
      data: dataSeriesCA.cotisationSociale,
    },
    {
      name:
        "Achat de marchandises, matières premières et autre approvisionnement",
      data: dataSeriesCA.marchandisesTotalAfficher,
    },
  ];
  if (showTaxeVsSubvention) {
    seriesCA.push({
      name: "Taxes diverses retranchées des subventions",
      data: dataSeriesCA.taxesMoinsSubventions,
    });
  }
  if (showResultatExploitation) {
    seriesCA.push({
      name: "Résultat d'exploitation (marge de l'entreprise)",
      data: dataSeriesCA.resultatExploitation,
    });
  }

  let optionsChartCA = {
    series: seriesCA,
    xAxis: {
      data: xLabels,
    },
    yAxis: {
      name: units.unitCA,
    },
  };
  let optionsChartMargin = {
    series: [
      {
        name: "Participation",
        data: dataSeriesMargin.Participation,
      },
      {
        name: "Impôts",
        data: dataSeriesMargin.ImpotsSurLesSocietes,
      },
      {
        name: "Bénéfices",
        data: dataSeriesMargin.resultatPourProprietaire,
      },
      {
        name: "Résultats financier et exceptionnel",
        data: dataSeriesMargin.resultatExceptionnelEtFinancier,
      },
    ],
    xAxis: {
      data: xLabels,
    },
    yAxis: {
      name: units.unitMargin,
    },
  };
  return {
    optionsChartMargin,
    optionsChartCA,
    listOfUndisplayableData,
  };
};

export default {
  calculateChartDetails,
};

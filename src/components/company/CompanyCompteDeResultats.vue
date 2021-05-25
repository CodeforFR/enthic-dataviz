<template>
  <div>
    <div class="columns" v-if="companyData.comptesDeResultats">
      <div class="column">
        <div class="box has-background-grey-lighter">
          <h3 class="title is-3">Scoring (version beta)</h3>
          <div class="tile is-ancestor is-vertical">
            <div class="tile is-parent">
              <div class="tile"></div>
              <div
                class="tile"
                v-for="(oneYeardata, index) in companyData.comptesDeResultats"
                :key="index"
              >
                Année {{ oneYeardata.year }}
              </div>
            </div>
            <div class="tile is-parent">
              <div class="tile">score de transparence (sur 100)</div>
              <div
                class="tile"
                v-for="(oneYeardata, index) in companyData.comptesDeResultats"
                :key="index"
              >
                {{ oneYeardata.scores.transparencyScore }}
              </div>
            </div>
            <div class="tile is-parent">
              <div class="tile">score de partage (sur 100)</div>
              <div
                class="tile"
                v-for="(oneYeardata, index) in companyData.comptesDeResultats"
                :key="index"
              >
                {{ oneYeardata.scores.sharingScore }}
              </div>
            </div>
            <div class="tile is-parent">
              <div class="tile">
                score d'ancrage dans l'économie réelle (sur 100)
              </div>
              <div
                class="tile"
                v-for="(oneYeardata, index) in companyData.comptesDeResultats"
                :key="index"
              >
                {{ oneYeardata.scores.realEconomyScore }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="columns" v-if="companyData.comptesDeResultats">
      <div class="column">
        <div class="box has-background-info" v-if="chartDetails">
          <h3 class="title is-3">Répartition du chiffre d'affaire</h3>
          <p>
            Ce graphique montre la répartition des charges payées par le chiffre
            d'affaire de l'entreprise. La hauteur de chaque colonne correspond
            au chiffre d'affaire.
          </p>

          <BarChart
            :options="chartDetails.optionsChartCA"
            :isStacked="true"
          ></BarChart>
          <p>Listes des problèmes pour afficher le graphique</p>
          <ul>
            <li
              v-for="(item, index) in chartDetails.undisplayables"
              :key="index"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="columns" v-if="companyData.comptesDeResultats">
      <div class="column">
        <div class="box has-background-info" v-if="chartDetails">
          <h3 class="title is-3">Répartition du profit de l'entreprise</h3>
          <p>
            Ce graphique montre comment la marge de l'entreprise sur son
            activité principale (résultat d'exploitation) est répartie entre :
          </p>
          <ul>
            <li>les salarié⋅es (participation)</li>
            <li>la collectivité (impôts)</li>
            <li>l'entreprise (bénéfices)</li>
            <li>
              les créanciers, les marchés, etc... (Résultats financier et
              exceptionnel)
            </li>
          </ul>
          <BarChart :options="chartDetails.optionsChartMargin"></BarChart>

          <p>
            Un montant positif signifie que l'entreprise a donné de l'argent à
            l'acteur économique en question, un montant négatif signifie que
            l'acteur économique donne de l'argent à l'entreprise.
          </p>
        </div>
      </div>
    </div>

    <div class="columns" v-if="companyData.comptesDeResultats">
      <div class="column">
        <div class="box">
          <h3 class="title is-3">Comptes de résultat détaillés</h3>
          <div
            class="tile is-ancestor is-vertical"
            v-if="
              companyData.comptesDeResultats &&
              companyData.comptesDeResultats.length > 0
            "
          >
            <p class="subtitle">
              Cliquer sur une ligne permet de découvrir les détails de sa
              composition
            </p>
            <div class="tile is-parent">
              <div class="tile is-6"></div>
              <div
                class="tile"
                v-for="(oneYeardata, index) in companyData.comptesDeResultats"
                :key="index"
              >
                Année {{ oneYeardata.year }}
              </div>
            </div>
            <FoldingArray
              :rowItem="companyData.comptesDeResultats"
            ></FoldingArray>
            <div class="tile is-parent">
              <p class="tile" style="color: #194">
                Une valeur en vert est une valeur officielle et qui peut être
                retrouvée avec les autres valeurs fournies (erreur de maximum
                0,5% ou 10€ tolérée)
              </p>
              <p class="tile" style="color: #419">
                Une valeur en bleu est une valeur non fournie mais qui peut être
                retrouvée avec les autres valeurs
              </p>
              <p class="tile" style="color: #941">
                Une valeur en rouge est une valeur non fournie, ou officielle
                mais ne correspondant pas aux autres valeurs
              </p>
            </div>
          </div>
          <div v-else>Aucune données</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BarChart from "@/components/charts/BarChart";
import FoldingArray from "./FoldingArray.vue";

export default {
  name: "CompanyCompteDeResultats",
  props: ["companyData"],
  components: {
    BarChart,
    FoldingArray,
  },
  computed: {
    chartDetails() {
      // Find perfect unit for CA graphic (€, k€ or M€)
      let beneficeItem = this.companyData.comptesDeResultats[0];
      if (!beneficeItem) {
        return null;
      }
      let factorCA = 1;
      let unitCA = "€";
      let CADeReference =
        beneficeItem.children.ResultatAvantImpot.children.ResultatExploitation
          .children.ProduitsExploitation.children.ChiffresAffairesNet.data
          .value;
      if (CADeReference > 10000000) {
        factorCA = 1000000;
        unitCA = "millions d'€";
      } else if (CADeReference > 300000) {
        factorCA = 1000;
        unitCA = "milliers d'€";
      }

      // Find perfect unit for margin graphic (€, k€ or M€)
      let factor = 1;
      let unitMargin = "€";
      let resultatDeReference =
        beneficeItem.children.ResultatAvantImpot.children.ResultatExploitation
          .data.value;
      if (isNaN(resultatDeReference)) {
        resultatDeReference = beneficeItem.data.value;
      }
      if (resultatDeReference > 3000000 || resultatDeReference < -3000000) {
        factor = 1000000;
        unitMargin = "millions d'€";
      } else if (resultatDeReference > 30000 || resultatDeReference < -100000) {
        factor = 1000;
        unitMargin = "milliers d'€";
      }

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
      for (let i = 0; i < this.companyData.comptesDeResultats.length; i++) {
        xLabels.push(this.companyData.comptesDeResultats[i].year);

        // Local variables for code visibility
        let rootItem = this.companyData.comptesDeResultats[i];
        let resultExploit =
          rootItem.children.ResultatAvantImpot.children.ResultatExploitation;
        let produits = resultExploit.children.ProduitsExploitation;
        let charges = resultExploit.children.ChargesExploitation;

        // Get all needed values for first graphic (about Chiffre d'Affaire)
        let impotsEtAssimiles = this.cleanUndefinedDataForGraphicalDisplay(
          charges.children.ImpotTaxesEtVersementsAssimiles,
          listOfUndisplayableData,
          xLabels[i]
        );
        let subventions = this.cleanUndefinedDataForGraphicalDisplay(
          produits.children.SubventionsExploitation,
          listOfUndisplayableData,
          xLabels[i]
        );
        let achatMarchandises = this.cleanUndefinedDataForGraphicalDisplay(
          charges.children.AchatsDeMarchandises,
          listOfUndisplayableData,
          xLabels[i]
        );
        let variationMarchandises = this.cleanUndefinedDataForGraphicalDisplay(
          charges.children.VariationStockMarchandises,
          listOfUndisplayableData,
          xLabels[i]
        );
        let achatMatierePremiere = this.cleanUndefinedDataForGraphicalDisplay(
          charges.children.AchatMatierePremiereAutreAppro,
          listOfUndisplayableData,
          xLabels[i]
        );
        let variationMatierePremiere = this.cleanUndefinedDataForGraphicalDisplay(
          charges.children.VariationStockMatierePremiereEtAppro,
          listOfUndisplayableData,
          xLabels[i]
        );
        let salaire = this.cleanUndefinedDataForGraphicalDisplay(
          charges.children.SalairesEtTraitements,
          listOfUndisplayableData,
          xLabels[i]
        );
        let cotisation = this.cleanUndefinedDataForGraphicalDisplay(
          charges.children.ChargesSociales,
          listOfUndisplayableData,
          xLabels[i]
        );
        let resultatExploitation = this.cleanUndefinedDataForGraphicalDisplay(
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
          dataSeriesCA.taxesMoinsSubventions.push(
            impotsEtAssimiles - subventions
          );
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
        dataSeriesCA.autreChargesMoinsAutresProduitsAffiches.push(
          produits.children.ChiffresAffairesNet.data.value -
            salaire -
            cotisation -
            dataSeriesCA.taxesMoinsSubventions[i] -
            dataSeriesCA.marchandisesTotalAfficher[i] -
            resultatExploitation
        );

        // Application du ratio pour l'affichage du graphe sur le CA
        dataSeriesCA.salaires.push(this.computeRatio(salaire, factorCA));
        dataSeriesCA.cotisationSociale.push(
          this.computeRatio(cotisation, factorCA)
        );
        dataSeriesCA.taxesMoinsSubventions[i] = this.computeRatio(
          dataSeriesCA.taxesMoinsSubventions[i],
          factorCA
        );
        dataSeriesCA.marchandisesTotalAfficher[i] = this.computeRatio(
          dataSeriesCA.marchandisesTotalAfficher[i],
          factorCA
        );
        dataSeriesCA.autreChargesMoinsAutresProduitsAffiches[
          i
        ] = this.computeRatio(
          dataSeriesCA.autreChargesMoinsAutresProduitsAffiches[i],
          factorCA
        );
        dataSeriesCA.resultatExploitation.push(
          this.computeRatio(resultatExploitation, factorCA)
        );

        // Application du ratio pour l'affichage du graphe sur le résultat d'exploitation
        dataSeriesMargin.Participation.push(
          Math.round(
            (1000 *
              rootItem.children.ParticipationSalariesAuxResultats.data.value) /
              factor
          ) / 1000
        );
        dataSeriesMargin.ImpotsSurLesSocietes.push(
          this.computeRatio(
            rootItem.children.ImpotsSurLesBenefices.data.value,
            factor
          )
        );
        dataSeriesMargin.resultatPourProprietaire.push(
          this.computeRatio(rootItem.data.value, factor)
        );
        dataSeriesMargin.resultatExceptionnelEtFinancier.push(
          Math.round(
            (1000 *
              (-rootItem.children.ResultatExceptionnel.data.value -
                rootItem.children.ResultatAvantImpot.children.ResultatFinancier
                  .data.value)) /
              factor
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
        console.log("showing taxe and sub");
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
          name: unitCA,
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
          name: unitMargin,
        },
      };
      return {
        optionsChartMargin: optionsChartMargin,
        optionsChartCA: optionsChartCA,
        undisplayables: listOfUndisplayableData,
      };
    },
  },

  methods: {
    cleanUndefinedDataForGraphicalDisplay(item, undefinedDataList, year) {
      if (isNaN(item.data.value)) {
        undefinedDataList.push(item.name + " non fournis pour l'année " + year);
        return 0;
      }
      return item.data.value;
    },
    computeRatio(value, factor) {
      return Math.round((1000 * value) / factor) / 1000;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/app-colors.scss";
@import "../../assets/css/app-misc.scss";

main {
  // background-color: $app-blue-deep;
  background-color: $app-grey-background;
  margin-top: 0; // $app-navbar-height;
  height: 100%;
  padding-bottom: 3em;
}

ul {
  list-style-type: circle;
}

.block-color {
  background-color: $app-secondary !important;
  color: white;
}

.tag {
  background-color: $app-secondary;
  color: white;
  margin-right: 1em;
  margin-bottom: 0.5em;
}

a.disabled {
  pointer-events: none;
  border-bottom: none !important ;
  cursor: default;
}

a.back {
  padding: 1em 0;
  display: block;

  color: $app-text-color;
  // color: white ;

  img,
  .icon {
    height: 1.5em;
    transform: translateY(0.1em);
  }

  span {
    margin-left: 1em;
    // color: white ;
  }
}

.columns {
  margin-top: 0;
}

.illustration {
  width: 100%;
  margin-bottom: 1em;
}

.description,
.added {
  // background-color: $app-blue-deep;
  background-color: white;
  // color: white;
  padding: 1em;
  margin-bottom: 1em;
}

.description {
  p {
    margin-bottom: 1em;
  }

  a {
    color: $app-primary;
    border-bottom: 1px solid $app-primary;
  }
}

.added {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;

  .link-at-sourcer img {
    max-height: 1.1em;
    transform: translateY(0.2em);
  }

  img {
    height: auto;
  }

  .no-left-padding {
    padding-left: 0em;
  }
  .is-vertical-centered {
    // padding-left: 1em;
    display: flex;
    align-items: center;
  }

  .logo {
    // max-width: 175px;
    height: auto;
    width: 100%;
  }

  a {
    color: $app-primary;
    font-weight: bold;
  }
}

.pending {
  text-align: center;
  padding: 9em;
}

svg {
  margin: 25px;
}
path {
  fill: none;
  stroke: #76bf8a;
  stroke-width: 3px;
}
</style>

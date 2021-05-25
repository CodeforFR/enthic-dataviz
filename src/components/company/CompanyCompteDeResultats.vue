<template>
  <div>
    <div class="columns" v-if="comptesDeResultats">
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
              v-for="(item, index) in chartDetails.listOfUndisplayableData"
              :key="index"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="columns" v-if="comptesDeResultats">
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
    <div></div>
  </div>
</template>

<script>
import BarChart from "@/components/charts/BarChart";
import ChartDataService from "@/services/companyData/CompteDeResultatsCharts.js";

export default {
  name: "CompanyCompteDeResultats",
  props: ["comptesDeResultats"],
  components: {
    BarChart,
  },
  computed: {
    chartDetails() {
      const chartData = ChartDataService.calculateChartDetails(
        this.comptesDeResultats
      );
      return chartData;
    },
  },
};
</script>

<style lang="scss" scoped>
ul {
  list-style-type: circle;
}
</style>

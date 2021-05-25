<template>
  <div class="columns" v-if="chartDetails">
    <div class="column">
      <div class="box has-background-info">
        <h3 class="title is-3">Répartition du chiffre d'affaire</h3>
        <p>
          Ce graphique montre la répartition des charges payées par le chiffre
          d'affaire de l'entreprise. La hauteur de chaque colonne correspond au
          chiffre d'affaire.
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
</template>

<script>
import BarChart from "@/components/charts/BarChart";

export default {
  name: "CompanyChartCA",
  props: ["chartDetails"],
  components: {
    BarChart,
  },
};
</script>

<style lang="scss" scoped>
ul {
  list-style-type: circle;
}
</style>

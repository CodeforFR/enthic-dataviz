<template>
  <Widget
    title="Répartition du chiffre d'affaire"
    titleColor="#ff99ff"
    v-if="chartDetails"
  >
    <p>
      Ce graphique montre la répartition des charges payées par le chiffre
      d'affaire de l'entreprise. La hauteur de chaque colonne correspond au
      chiffre d'affaire.
    </p>

    <BarChart
      :options="chartDetails.optionsChartCA"
      :isStacked="true"
    ></BarChart>
    <p class="title is-6">Listes des problèmes pour afficher le graphique</p>
    <ul class="m-30">
      <li
        v-for="(item, index) in chartDetails.listOfUndisplayableData"
        :key="index"
      >
        {{ item }}
      </li>
    </ul>
  </Widget>
</template>

<script>
import Widget from "./Widget.vue";
import BarChart from "@/components/charts/BarChart";

export default {
  name: "CompanyChartCA",
  props: ["chartDetails"],
  components: {
    BarChart,
    Widget,
  },
};
</script>

<style lang="scss" scoped>
ul {
  list-style-type: circle;
}
</style>

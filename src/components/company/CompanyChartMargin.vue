<template>
  <Widget
    title="Répartition du profit de l'entreprise"
    titleColor="#ff9999"
    v-if="chartDetails"
  >
    <p>
      Ce graphique montre comment la marge de l'entreprise sur son activité
      principale (résultat d'exploitation) est répartie entre :
    </p>
    <ul class="m-l-30">
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
      l'acteur économique en question, un montant négatif signifie que l'acteur
      économique donne de l'argent à l'entreprise.
    </p>
  </Widget>
</template>

<script>
import Widget from "./Widget.vue";
import BarChart from "@/components/charts/BarChart";

export default {
  name: "CompanyChartMargin",
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

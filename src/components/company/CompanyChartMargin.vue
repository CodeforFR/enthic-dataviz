<template>
  <div class="columns" v-if="chartDetails">
    <div class="column">
      <div class="box has-background-info">
        <h3 class="title is-3">Répartition du profit de l'entreprise</h3>
        <p>
          Ce graphique montre comment la marge de l'entreprise sur son activité
          principale (résultat d'exploitation) est répartie entre :
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
</template>

<script>
import BarChart from "@/components/charts/BarChart";

export default {
  name: "CompanyChartMargin",
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

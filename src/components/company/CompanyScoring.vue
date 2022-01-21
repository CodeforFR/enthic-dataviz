<template>
  <Widget
    title="Scoring (version beta)"
    titleColor="#536dfc"
    v-if="companyData.comptesDeResultats"
  >
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
        <div class="tile">score d'ancrage dans l'économie réelle (sur 100)</div>
        <div
          class="tile"
          v-for="(oneYeardata, index) in companyData.comptesDeResultats"
          :key="index"
        >
          {{ oneYeardata.scores.realEconomyScore }}
        </div>
      </div>
    </div>
  </Widget>
</template>

<script>
import Widget from "./Widget.vue";

export default {
  name: "CompanyScoring",
  props: ["companyData"],
  components: {
    Widget,
  },
};
</script>

<template>
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
</template>

<script>
export default {
  name: "CompanyScoring",
  props: ["companyData"],
};
</script>

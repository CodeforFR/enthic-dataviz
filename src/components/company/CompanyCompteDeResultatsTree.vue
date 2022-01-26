<template>
  <Widget
    title="Comptes de résultat détaillés"
    titleColor="#536dfc"
    v-if="companyData.comptesDeResultats"
  >
    <div
      class="is-ancestor is-vertical"
      v-if="
        companyData.comptesDeResultats &&
        companyData.comptesDeResultats.length > 0
      "
    >
      <div class="tile is-parent">
        <div class="tile is-6"></div>
        <div
          class="tile"
          v-for="(oneYeardata, index) in companyData.comptesDeResultats"
          :key="index"
        >
          année {{ oneYeardata.year }}
        </div>
      </div>
      <FoldingArray :rowItem="companyData.comptesDeResultats"></FoldingArray>
      <div>
        <div class="value-legend-container">
          <div class="square green"></div>

          <p>
            Une valeur en vert est une valeur officielle et qui peut être
            retrouvée avec les autres valeurs fournies (erreur de maximum 0,5%
            ou 10€ tolérée)
          </p>
        </div>

        <div class="value-legend-container">
          <div class="square blue"></div>

          <p>
            Une valeur en bleu est une valeur non fournie mais qui peut être
            retrouvée avec les autres valeurs
          </p>
        </div>

        <div class="value-legend-container">
          <div class="square red"></div>

          <p>
            Une valeur en rouge est une valeur non fournie, ou officielle mais
            ne correspondant pas aux autres valeurs
          </p>
        </div>
      </div>
    </div>
    <div v-else>Aucune données</div>
  </Widget>
</template>

<script>
import Widget from "./Widget.vue";
import FoldingArray from "./FoldingArray.vue";

export default {
  name: "CompanyCompteDeResultatsTree",
  props: ["companyData"],
  components: {
    FoldingArray,
    Widget,
  },
};
</script>

<style scoped>
.value-legend-container {
  display: flex;
  align-items: center;
}
.square {
  width: 25px;
  height: 15px;
  margin-right: 10px;
  background: blue;
}
.green {
  background: #00bfc7;
}
.blue {
  background: #536dfc;
}
.red {
  background: #ff4a4a;
}
.tile {
  color: #18097c;
  font-weight: bold;
}
</style>

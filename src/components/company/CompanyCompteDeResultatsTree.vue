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
        <p style="color: #194;">
          Une valeur en vert est une valeur officielle et qui peut être
          retrouvée avec les autres valeurs fournies (erreur de maximum 0,5% ou
          10€ tolérée)
        </p>
        <p style="color: #419;">
          Une valeur en bleu est une valeur non fournie mais qui peut être
          retrouvée avec les autres valeurs
        </p>
        <p style="color: #941;">
          Une valeur en rouge est une valeur non fournie, ou officielle mais ne
          correspondant pas aux autres valeurs
        </p>
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
.tile {
  color: #18097c;
  font-weight: bold;
}
</style>

<template>
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
              retrouvée avec les autres valeurs fournies (erreur de maximum 0,5%
              ou 10€ tolérée)
            </p>
            <p class="tile" style="color: #419">
              Une valeur en bleu est une valeur non fournie mais qui peut être
              retrouvée avec les autres valeurs
            </p>
            <p class="tile" style="color: #941">
              Une valeur en rouge est une valeur non fournie, ou officielle mais
              ne correspondant pas aux autres valeurs
            </p>
          </div>
        </div>
        <div v-else>Aucune données</div>
      </div>
    </div>
  </div>
</template>

<script>
import FoldingArray from "./FoldingArray.vue";

export default {
  name: "CompanyCompteDeResultatsTree",
  props: ["companyData"],
  components: {
    FoldingArray,
  },
};
</script>

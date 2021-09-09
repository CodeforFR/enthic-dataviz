<template>
  <div class="columns">
    <div class="column">
      <div class="box has-background-grey-lighter">
        <h3 class="tile title">Autre représentation des comptes de résultat</h3>
        <ul
          v-for="oneYeardata in companyData.comptesDeResultats"
          v-bind:key="oneYeardata.year"
        >
          <p>Année {{ oneYeardata.year }}</p>
          <TreeView class="item" :item="oneYeardata" />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import TreeView from "./TreeView.vue";

export default {
  name: "CompanyOtherCompteDeResultats",
  props: ["companyData"],
  components: {
    TreeView,
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/app-colors.scss";
@import "../../assets/css/app-misc.scss";

ul {
  list-style-type: circle;
}
</style>

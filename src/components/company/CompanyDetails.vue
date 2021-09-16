<template>
  <div>
    <main v-if="companyData">
      <div class="container">
        <!-- BACK TO RESULTS -->
        <a class="back" @click="goBack">
          <span class="icon">
            <i class="fas fa-arrow-left"></i>
          </span>
          <span> Retour aux résultats de recherche </span>
        </a>
        <CompanyIdentity :companyData="companyData" />
        <CompanyNoCompteDeResultats :companyData="companyData" />
        <CompanyChartCA :chartDetails="chartCADetails" />
        <CompanyChartMargin :chartDetails="chartMarginDetails" />
        <CompanyCompteDeResultatsTree :companyData="companyData" />
        <CompanySocialImpactComparison :companyData="companyData" />
        <CompanyScoring :companyData="companyData" />
        <CompanyOtherData :companyData="companyData" />
        <CompanyOtherCompteDeResultats
          v-if="false"
          :companyData="companyData"
        />
      </div>
    </main>
  </div>
</template>

<script>
import ChartDataService from "@/services/companyData/CompteDeResultatsCharts.js";

import CompanyIdentity from "./CompanyIdentity.vue";
import CompanyNoCompteDeResultats from "./CompanyNoCompteDeResultats.vue";
import CompanyChartCA from "./CompanyChartCA.vue";
import CompanyChartMargin from "./CompanyChartMargin.vue";
import CompanyCompteDeResultatsTree from "./CompanyCompteDeResultatsTree.vue";
import CompanySocialImpactComparison from "./CompanySocialImpactComparison.vue";
import CompanyScoring from "./CompanyScoring.vue";
import CompanyOtherData from "./CompanyOtherData.vue";
import CompanyOtherCompteDeResultats from "./CompanyOtherCompteDeResultats.vue";

export default {
  name: "DynamicDetail",
  components: {
    CompanyIdentity,
    CompanyNoCompteDeResultats,
    CompanyChartCA,
    CompanyChartMargin,
    CompanyCompteDeResultatsTree,
    CompanySocialImpactComparison,
    CompanyScoring,
    CompanyOtherData,
    CompanyOtherCompteDeResultats,
  },
  props: ["companyData"],
  computed: {
    chartCADetails() {
      return ChartDataService.calculateCAChartDetails(
        this.companyData.comptesDeResultats
      );
    },
    chartMarginDetails() {
      return ChartDataService.calculateMarginChartDetails(
        this.companyData.comptesDeResultats
      );
    },
  },
  methods: {
    goBack(e) {
      e.preventDefault();
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/app-colors.scss";
@import "../../assets/css/app-misc.scss";

.layout-company-details {
  text-align: left;
}

main {
  background-color: $app-grey-background;
  margin-top: 0;
  height: 100%;
  padding-bottom: 3em;
  text-align: left;
}

a.disabled {
  pointer-events: none;
  border-bottom: none !important ;
  cursor: default;
}

a.back {
  padding: 1em 0;
  display: block;

  color: $app-text-color;
  // color: white ;

  img,
  .icon {
    height: 1.5em;
    transform: translateY(0.1em);
  }

  span {
    margin-left: 1em;
    // color: white ;
  }
}
</style>

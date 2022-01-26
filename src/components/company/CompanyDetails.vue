<template>
  <div>
    <main v-if="companyData">
      <div class="company-data-container">
        <!-- BACK TO RESULTS -->
        <div class="navbar-and-csv container">
          <a class="back" @click="goBack">
            <span class="icon">
              <i class="fas fa-arrow-left"></i>
            </span>
            <span class="back-to-results"
              >Retour aux résultats de recherche</span
            >
          </a>
          <ExportCsv :companyData="companyData" />
        </div>
        <div class="grey-layer">
          <div class="first-section container">
            <CompanyIdentity
              class="company-detail"
              :companyData="companyData"
            />
            <CompanyChartCA
              class="company-chart-ca"
              :chartDetails="chartCADetails"
              v-if="thereIsFinancialData"
            />
          </div>
        </div>

        <CompanyChartMargin
          class="container"
          :chartDetails="chartMarginDetails"
          v-if="thereIsFinancialData"
        />
        <div class="grey-layer">
          <CompanyCompteDeResultatsTree
            :companyData="companyData"
            v-if="thereIsFinancialData"
          />
        </div>
        <CompanySocialImpactComparison
          :companyData="companyData"
          v-if="thereIsFinancialData"
        />
        <CompanyAccountMetadata :companyData="companyData" />
        <CompanyNoCompteDeResultats
          :companyData="companyData"
          v-if="!thereIsFinancialData"
        />
        <CompanyScoring
          :companyData="companyData"
          v-if="thereIsFinancialData"
        />
        <CompanyOtherData
          :companyData="companyData"
          v-if="thereIsFinancialData"
        />
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
import CompanyAccountMetadata from "./CompanyAccountMetadata.vue";
import ExportCsv from "./exportCsv.vue";

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
    CompanyAccountMetadata,
    ExportCsv,
  },
  props: ["companyData"],
  computed: {
    thereIsFinancialData() {
      for (var i in this.companyData.comptesDeResultats) {
        if (this.companyData.comptesDeResultats[i]) {
          return true;
        }
      }
      return false;
    },
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
.company-data-container {
  width: 100%;
}
.back-to-results {
  color: #18097c;
  font-weight: bold;
}

.first-section {
  display: flex;
  position: relative;
  padding-top: 1rem;
  padding-bottom: 0rem !important;
}
.grey-layer {
  background-color: rgba(156, 164, 209, 0.16);
}
.company-chart-ca {
  width: 60%;
}

.company-detail {
  width: 40%;
  height: 50%;
}

.layout-company-details {
  text-align: left;
}

.navbar-and-csv {
  display: flex;
  justify-content: space-between;
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

@media (max-width: 1400px) {
  .first-section {
    flex-direction: column;
    .company-detail,
    .company-chart-ca {
      width: 90%;
    }
  }
}
</style>

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
        <CompanyCompteDeResultats :companyData="companyData" />
        <CompanyStatisticsDisplay :companyData="companyData" />
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
import CompanyStatisticsDisplay from "./CompanyStatisticsDisplay.vue";
import CompanyCompteDeResultats from "./CompanyCompteDeResultats.vue";
import CompanyOtherData from "./CompanyOtherData.vue";
import CompanyOtherCompteDeResultats from "./CompanyOtherCompteDeResultats.vue";
import CompanyIdentity from "./CompanyIdentity.vue";

export default {
  name: "DynamicDetail",
  components: {
    CompanyIdentity,
    CompanyStatisticsDisplay,
    CompanyOtherData,
    CompanyCompteDeResultats,
    CompanyOtherCompteDeResultats,
  },
  props: ["companyData"],
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

main {
  background-color: $app-grey-background;
  margin-top: 0;
  height: 100%;
  padding-bottom: 3em;
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

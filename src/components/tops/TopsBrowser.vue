<template>
  <div>
    <select class="form-control" v-model="BundleTypeTop" @change="top50data()">
      <option value="" selected disabled>Choose</option>
      <option v-for="(bundle_type, bundle_key) in bundle_types" :value="bundle_key" :key="bundle_type['0']">{{ bundle_type['1'] }}</option>
    </select>
      <select class="form-control" v-model="selected_year" @change="top50data()">
        <option v-for="year in years" :value="year" :key="year">{{ year }}</option>
      </select>
    <h1> {{ top_data.contexte }} de l'année {{ top_data.annee }} de '{{ top_data.sujet }}' </h1>
    <div v-for="(company, index) in top_data.donnees" :key="index">
        <router-link
          class="result-link"
          :to="companyDetailRoute(company)"
        >
          <div class="columns box my-1 p-0">
            <div class="column">
              <div class="company_denomination">
                {{ company.denomination }}
              </div>
              <div class="siren_number">SIREN : {{ company.siren }}</div>
            </div>
            <div class="column">
              <div class="company_main_info">
                {{ company.ape.value }}
              </div>
              <div class="company_secondary_info">
                {{ company.ape.code }}
              </div>
            </div>
            <div class="column company_main_info">
              {{ formattedAmount(company.montant) }}
            </div>
          </div>
        </router-link>
      </div>
  </div>
</template>

<script>
import TopsRepository from "@/repositories/tops/TopsRepository";
import AccountingService from "@/services/accounting/AccountingService";
import OntologyRepository from "@/repositories/ontology/OntologyRepository";

export default {
  name: "TopsBrowser",
  data: function () {
    return {
      top_data: {},
      bundle_types : [7, 8, 9],
      years : [2021, 2020, 2019],
      BundleTypeTop : 7,
      selected_year : 2021,
    };
  },
  mounted() {
    this.top50data();
    this.initializeTopsCriterion();
  },
  methods: {
    companyDetailRoute: (company) => ({
      name: "Detail",
      params: { siren: company.siren },
    }),
    top50data: function () {
      console.log("top50data triggerred with", this.BundleTypeTop)
      var vm = this
      TopsRepository.getTopOnBundle(this.BundleTypeTop, this.selected_year).then((response) => {
        console.log("topdata:", response);
        vm.top_data = response
        return response;
      })
    },
    formattedAmount: function (amount) {
      return AccountingService.formatAmount(amount);
    },
    initializeTopsCriterion: async function () {
      // Get bundles description
      let result = await OntologyRepository.getBundles();
      let bundles = result.accounting[0].code
      console.log("bundles:", bundles)
      this.bundle_types = bundles
    },
  }
};
</script>

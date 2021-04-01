<template>
  <div class="layout-search">
    <img
      v-if="loading"
      class="loading-indicator"
      src="@/assets/loading.svg"
      alt=""
    />
    <h3 v-if="loading">
      recherche en cours de l'entreprise avec le SIREN '{{ siren }}'
    </h3>
    <div class="error-message" v-if="error">
      Erreur lors de la récuperation des donnés : {{ error }}
    </div>
    <div v-if="results">
      <CompanyDetails :companyData="results" />
    </div>
    <div v-if="noResult">
      Il n'y a pas d'entreprise avec le SIREN '{{ siren }}' dans les données
      Enthic.
    </div>
  </div>
</template>

<script>
import CompanyDetails from "@/components/company/CompanyDetails.vue";
import CompanyDataService from "@/services/companyData/CompanyDataService";

export default {
  props: ["siren"],
  components: {
    CompanyDetails,
  },
  data() {
    return {
      results: null,
      loading: true,
      error: null,
      noResult: false,
    };
  },
  created() {
    this.search(
      async () => await CompanyDataService.getCompanyDataBySiren(this.siren)
    );
  },
  methods: {
    async search(fetchOperation) {
      try {
        this.loading = true;
        this.results = null;
        const results = await fetchOperation();
        this.error = null;
        this.results = results;
        this.noResult = results === null;
      } catch (e) {
        this.error = e;
        this.noResult = false;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.layout-search {
  text-align: center;
  margin: auto 0;
}

.loading-indicator {
  transform: scale(0.4);
}
.error-message {
  color: red;
}
</style>

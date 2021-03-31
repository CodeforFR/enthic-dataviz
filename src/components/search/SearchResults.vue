<template>
  <div>
    <img
      v-if="loading"
      class="loading-indicator"
      src="@/assets/loading.svg"
      alt=""
    />
    <h3 v-if="loading">recherche en cours pour '{{ text }}'</h3>
    <div class="error-message" v-if="error">
      Erreur lors de la recherche '{{ text }}' : {{ error }}
    </div>
    <div v-if="results">
      <h3>Résultats pour la recherche '{{ text }}' :</h3>
      <h4>{{ results.totalItems }} sociétés trouvées</h4>
      <CompanyList :companies="results.member" />
    </div>
  </div>
</template>

<script>
import CompanyList from "@/components/company/CompanyList.vue";
import SearchService from "@/services/search/SearchService";
// import SearchService from "@/services/search/SearchService.fake";

export default {
  components: {
    CompanyList,
  },
  data() {
    return {
      results: null,
      loading: true,
      error: null,
    };
  },
  created() {
    this.search(() => SearchService.searchCompaniesFromText(this.text));
  },
  computed: {
    text() {
      return this.$route.query.text;
    },
  },
  methods: {
    async search(fetchOperation) {
      console.log("search");
      try {
        this.loading = true;
        this.results = null;
        const results = await fetchOperation();
        this.error = null;
        this.results = results;
      } catch (e) {
        this.error = e;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.loading-indicator {
  transform: scale(0.4);
}
.error-message {
  color: red;
}
</style>

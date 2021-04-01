<template>
  <div class="layout-search">
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
      <h3>résultats pour la recherche '{{ text }}'</h3>
      <h4 class="result-count">
        <span class="result-count-number">
          {{ results.totalItems }}
        </span>
        sociétés trouvées
      </h4>
      <CompanyList :companies="results.member" />
    </div>
  </div>
</template>

<script>
import CompanyList from "@/components/company/CompanyList.vue";
import SearchRepository from "@/repositories/search/SearchRepository";
// import SearchRepository from "@/repositories/search/SearchRepository.fake";

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
    this.search(() => SearchRepository.searchCompaniesFromText(this.text));
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

<style lang="scss" scoped>
@import "../../assets/css/apiviz-colors.scss";

h3 {
  font-size: 130%;
}
.layout-search {
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 4rem;
  min-height: 30vh;
}

.loading-indicator {
  transform: scale(0.4);
}
.error-message {
  color: $apiviz-danger;
}
.result-count {
  margin: 1rem;
}
.result-count-number {
  font-weight: 600;
  color: $apiviz-grey-light;
}
</style>

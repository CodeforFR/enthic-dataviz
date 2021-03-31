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
    <h3 v-if="results">Résultats pour la recherche '{{ text }}' :</h3>
    <CompanyList :companies="results" />
  </div>
</template>

<script>
import CompanyList from "@/components/company/CompanyList.vue";

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
    try {
      this.loading = true;
      // call the API
      this.results = [
        { denomination: { value: "google France" } },
        { denomination: { value: "google Corporate" } },
      ];
      // throw new Error("impossible to get the result");
    } catch (e) {
      this.error = e;
    } finally {
      this.loading = false;
    }
  },
  computed: {
    text() {
      return this.$route.query.text;
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

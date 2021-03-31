<template>
  <div>
    <h1>Recherche</h1>
    <h3>en cours de développement de la version 2 ...</h3>
    <a href="https://opencompaniesdata.netlify.app/" rel="alternate">
      <h3>retour à la version 1 (open companies data)</h3>
    </a>
    <SearchResults :text="text" />
  </div>
</template>

<script>
import SearchResults from "../components/search/SearchResults.vue";

export default {
  components: {
    SearchResults,
  },
  computed: {
    text() {
      return this.$route.query.text;
    },
  },
};
</script>

<style scoped></style>

<template>
  <div>
    <a
      class="alt-link"
      href="https://opencompaniesdata.netlify.app/"
      rel="alternate"
    >
      <h3>retour open companies data version 1</h3>
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

<style scoped>
.alt-link {
  font-size: 0.8rem;
  background: gray;
}
</style>

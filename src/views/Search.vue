<template>
  <div>
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

<style lang="scss" scoped>
.alt-link {
  font-size: 0.8rem;
  background: gray;
}
</style>

<template>
  <div>
    <SearchBar :searchText="text" />
    <SearchResults :text="text" />
  </div>
</template>

<script>
import SearchBar from "@/components/search/SearchBar";
import SearchResults from "../components/search/SearchResults.vue";

export default {
  components: {
    SearchResults,
    SearchBar,
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

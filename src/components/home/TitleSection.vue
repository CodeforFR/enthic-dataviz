<template>
  <div class="columns p-20 m-b-30 m-t-30 has-background-white-bis">
    <div class="column">
      <div class="content has-text-centered">
        <h2 class="is-size-2">
          Explorez les données financières des entreprises françaises!
        </h2>
        <SearchBar />
        <div class="m-t-20">
          par exemple l'entreprise
          <router-link class="result-link" to="/recherche?text=enercoop">
            "Enercoop"</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from "@/components/search/SearchBar";

export default {
  name: "TitleSection",
  components: {
    SearchBar,
  },
};
</script>

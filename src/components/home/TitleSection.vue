<template>
  <div class="banner-and-search">
    <div class="banner">
      <div class="column is-10 is-offset-1 banner-flex">
        <div class="banner-text">
          <h2>Explorez les données financières des entreprises françaises !</h2>
          <p>
            Du mal à vous y retrouver avec toutes ces données et comprendre
            comment les interprêter ? Enthic est fait pour vous !
          </p>
        </div>
        <img
          src="@/assets/img/home/banner_illustration.png"
          alt="banner illustration"
        />
      </div>
    </div>

    <SearchBar />
    <div class="m-t-20">
      par exemple l'entreprise
      <router-link class="result-link" to="/recherche?text=enercoop">
        "Enercoop"</router-link
      >
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

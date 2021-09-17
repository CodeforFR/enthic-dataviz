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
    <div class="custom-shape-divider-top-1631883689">
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path d="M1200 0L0 0 598.97 114.72 1200 0z" class="shape-fill"></path>
      </svg>
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

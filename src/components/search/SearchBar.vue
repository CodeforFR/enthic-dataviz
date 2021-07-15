<template>
  <section id="top" class="container search-text primary-bg m-t-30">
    <div class="background columns is-centered top-section">
      <div class="column is-8">
        <form action="/recherche" method="GET" class="columns">
          <div class="column is-9">
            <div class="control has-icons-left is-large">
              <input
                type="search"
                name="text"
                class="input is-large search-box"
                :value="searchText"
                placeholder="Cherchez une entreprise par son nom"
              />
              <span class="icon is-left">
                <i class="fas fa-search"></i>
              </span>
            </div>
          </div>
          <div class="column is-3 is-hidden-mobile">
            <button
              class="button is-fullwidth is-primary is-primary-b is-outlined is-large"
              type="submit"
            >
              <span class="is-hidden-touch search-btn-as-text">
                Rechercher
              </span>
              <span class="icon is-hidden-desktop search-btn-as-icon">
                <i class="fas fa-search"></i>
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  props: {
    searchText: {
      type: String,
      required: false,
    },
  },
};
</script>
<style scoped>
.search-box {
  width: 98%;
  margin: 0 1vh;
}
.search-btn-as-icon {
  padding: 0 !important;
  margin: 0 !important;
}
.search-btn-as-text {
  font-size: large;
}
</style>

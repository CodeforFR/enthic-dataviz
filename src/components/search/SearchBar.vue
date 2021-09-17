<template>
  <section id="top" class="container search-text primary-bg m-t-30">
    <div class="background columns is-centered top-section">
      <div class="column is-8">
        <form action="/recherche" method="GET" class="columns search-bar">
          <div class="column is-9">
            <div class="control has-icons-left is-large">
              <input
                type="search"
                name="text"
                class="input is-large search-box"
                :value="searchText"
                placeholder="Saisissez le nom d'une entreprise (ex: enercoop)"
              />
              <span class="icon is-left" id="search-icon">
                <i class="fas fa-search"></i>
              </span>
            </div>
          </div>
          <div class="column is-3 is-hidden-mobile has-text-centered">
            <button class="search-btn" type="submit">
              <span class="is-hidden-touch search-btn-as-text">
                C'est parti 🚀
              </span>
              <!-- <span class="icon is-hidden-desktop search-btn-as-icon">
                <i class="fas fa-search"></i>
              </span> -->
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

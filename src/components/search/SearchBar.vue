<template>
  <section id="top" class="search-text primary-bg">
    <form action="/recherche" method="GET" class="search-bar">
      <div class="control has-icons-left">
        <input
          type="search"
          name="text"
          class="input search-box search-laptop"
          :value="searchText"
          placeholder="Saisissez le nom d'une entreprise (ex: enercoop)"
        />
<!-- Il faut conditionner l'affichage des inputs au niveau vue-js, sinon on a 2 textes de recherche dans l'URL 
        <input
          type="search"
          name="text"
          class="input search-box search-mobile"
          :value="searchText"
          placeholder="Nom de l'entreprise"
        />
      -->
        <span class="icon is-left" id="search-icon">
          <i class="fas fa-search"></i>
        </span>
      </div>
      <button class="search-btn" type="submit">
        <span class="search-btn-as-text">C'est parti 🚀</span>
      </button>
    </form>
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

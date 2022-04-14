<template>
  <section id="top" class="search-text primary-bg">
    <form action="/recherche" method="GET" class="search-bar">
      <div class="control has-icons-left">
        <input
          type="search"
          name="text"
          class="input search-box"
          :value="searchText"
          :placeholder="placeholder_value"
        />
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
  computed: {
    placeholder_value: function () {
      if (screen.width > 800) {
        return "Cherchez une entreprise par son nom, SIREN ou SIRET";
      }
      return "Nom de l'entreprise";
    },
  },
};
</script>

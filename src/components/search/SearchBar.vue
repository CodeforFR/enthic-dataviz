<!--
Quand le composant est monté : 
- la props "SearchText" (qui vient de la query) est chargé dans la data "inputText" => inputText est affiché dans l'input 
- quand on modifie le formulaire, où qu'on clique sur search-clear, on modifie inputText
-->

<template>
  <section id="top" class="search-text primary-bg px-6">
    <form action="/recherche" method="GET" class="search-bar">
      <div class="control has-icons-left">
        <input
          type="search"
          name="text"
          class="input search-box"
          id="searchBox"
          :value="inputText"
          :placeholder="placeholder_value"
          @input="inputChanged"
        />
        <div @click="clearValue" v-if="inputValue" class="search-clear">
          <div class="dashs-container">
            <div class="dash-1"></div>
            <div class="dash-2"></div>
          </div>
        </div>
      </div>
      <button class="search-btn" type="submit">
        <span class="search-btn-as-text">C'EST PARTI !</span>
      </button>
    </form>
  </section>
</template>

<script>
export default {
  data: function () {
    return {
      input: HTMLElement,
      inputValue: false,
      inputText: String,
    };
  },
  props: {
    searchText: {
      type: String,
      required: false,
    },
  },
  methods: {
    clearValue: function () {
      this.inputText = "";
      this.inputValue = false;
    },
    inputChanged: function (e) {
      this.inputText = e.target.value;
      this.inputValue = e.target.value !== "" ? true : false;
    },
  },
  computed: {
    placeholder_value: function () {
      if (screen.width > 800) {
        return "Saisissez le nom d'une entreprise (ex: enercoop)";
      }
      return "Nom de l'entreprise";
    },
  },
  mounted: function () {
    this.input = document.querySelector("#searchBox");
    this.inputText = this.searchText;
    this.inputValue = this.inputText !== "" ? true : false;
  },
};
</script>

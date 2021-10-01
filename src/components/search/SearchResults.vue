<template>
  <div>
    <div ref="searchBox" class="layout-search">
      <img
        v-if="loading"
        class="loading-indicator"
        src="@/assets/loading.svg"
        alt=""
      />
      <h3 v-if="loading">recherche en cours pour '{{ text }}'</h3>
      <h3 v-if="!loading && !error" class="is-size-3">
        Résultats pour la recherche
        <span class="is-3 is-italic">"{{ text }}"</span>
      </h3>

      <div class="error-message" v-if="error">
        Erreur lors de la recherche '{{ text }}' : {{ error }}
      </div>
      <div v-if="items">
        <span>via </span>
        <span class="control">
          <label class="radio">
            <input
              type="radio"
              name="answer"
              v-model="SearchEngine"
              value="OpenDataSoft"
              @change="searchInitial"
            />
            OpenDataSoft
          </label>
          <label class="radio">
            <input
              type="radio"
              name="answer"
              v-model="SearchEngine"
              value="Enthic"
              @change="searchInitial"
            />
            Enthic
          </label>
        </span>
        <h4 v-if="!loading && !error" class="result-count">
          <span class="result-count-number">
            {{ totalItems }}
          </span>
          sociétés trouvées
        </h4>
        <OpenDataSoftResultList
          v-if="SearchEngine == 'OpenDataSoft'"
          :companies="items"
          :sort="sortData"
          @sortChanged="handleSortChange"
        />
        <EnthicResultList v-if="SearchEngine == 'Enthic'" :companies="items" />
      </div>
    </div>
    <div v-if="remainingResultsCount > 0" class="next-results-plachodler">
      <div class="error-message" v-if="errorNext">
        Erreur lors de la recherche des pages suivante : {{ errorNext }}
      </div>
      <div>
        {{ remainingResultsCount }} sociétés restantes - chargement en cours ...
      </div>
      <img class="loading-indicator" src="@/assets/loading.svg" alt="" />
    </div>
    <div v-else>
      <div class="end-results">
        <hr />
        <h4 class="result-count">
          <span class="result-count-number">
            {{ totalItems }}
          </span>
          sociétés trouvées
        </h4>
      </div>
    </div>
    <div class="layout-search-footer"></div>
  </div>
</template>

<script>
import EnthicResultList from "./EnthicResultList.vue";
import OpenDataSoftResultList from "./OpenDataSoftResultList.vue";
import EnthicSearchRepository from "@/repositories/search/EnthicSearchRepository";
import OpenDataSoftSearchRepository from "@/repositories/search/OpenDataSoftSearchRepository";

// import SearchRepository from "@/repositories/search/SearchRepository.fake";

const FIELD_TRI_EFFECTIF = "trancheeffectifsunitelegaletriable";
const FIELD_TRI_DATE = "datecreationunitelegale";

export default {
  components: {
    OpenDataSoftResultList,
    EnthicResultList,
  },
  data() {
    return {
      lastResults: null,
      items: null,
      loading: true,
      loadingNext: false,
      error: null,
      errorNext: null,
      SearchEngine: "OpenDataSoft",
    };
  },
  created() {
    this.searchInitial();
  },
  mounted() {
    this.registerOnScroll();
  },
  beforeDestroy() {
    this.unregisterOnScroll();
  },
  watch: {
    $route() {
      this.searchInitial();
    },
  },
  computed: {
    text() {
      return this.$route.query.text;
    },
    totalItems() {
      if (!this.lastResults) return null;
      if (this.lastResults.nhits) return this.lastResults.nhits;
      return this.lastResults.totalItems;
    },
    remainingResultsCount() {
      if (!this.totalItems || !this.items) return 0;
      return this.totalItems - this.items.length;
    },
    nextSearchUrl() {
      if (this.SearchEngine !== "Enthic") return null;
      if (!this.lastResults || !this.lastResults.view) return null;
      return this.lastResults.view.next;
    },
    sortOption() {
      if (this.SearchEngine !== "OpenDataSoft") return null;
      return this.$route.query.sort;
    },
    sortEffectif() {
      if (this.SearchEngine !== "OpenDataSoft") return null;
      const sort = this.readSortQuery(this.$route.query.sort);
      return sort?.field === FIELD_TRI_EFFECTIF ? sort.order : null;
    },
    sortDate() {
      if (this.SearchEngine !== "OpenDataSoft") return null;
      const sort = this.readSortQuery(this.$route.query.sort);
      return sort?.field === FIELD_TRI_DATE ? sort.order : null;
    },
    sortData() {
      const data = this.readSortQuery(this.$route.query.sort);
      return data;
    },
    searchOptions() {
      switch (this.SearchEngine) {
        case "OpenDataSoft":
          return {
            text: this.text,
            sort: this.sortOption,
            offset: this.items ? this.items.length : 0,
          };
        case "Enthic":
          return {
            text: this.text,
            nextSearchUrl: this.nextSearchUrl,
          };
      }
      return null;
    },
    searchRepository() {
      switch (this.SearchEngine) {
        case "OpenDataSoft":
          return OpenDataSoftSearchRepository;
        case "Enthic":
          return EnthicSearchRepository;
      }
      return null;
    },
  },
  methods: {
    registerOnScroll() {
      window.onscroll = () => {
        this.checkScrollPosition();
      };

      window.onresize = () => {
        this.checkScrollPosition();
      };
    },
    unregisterOnScroll() {
      window.onscroll = null;
      window.onresize = null;
    },
    checkScrollPosition() {
      try {
        if (
          this.loading ||
          this.loadingNext ||
          this.error ||
          this.remainingResultsCount <= 0 ||
          !window.onscroll ||
          !window.onresize
        )
          return;
        const { clientHeight } = document.documentElement;
        const endOfContentHeight =
          this.$refs.searchBox.getBoundingClientRect().bottom;
        const screenRatio = 1.3;
        const shouldTriggerMoreData =
          endOfContentHeight < clientHeight * screenRatio;
        if (shouldTriggerMoreData) {
          this.searchNext();
        }
      } catch (error) {
        console.log("Error in infinit scroll logic:", error);
      }
    },
    async searchInitial() {
      try {
        this.loading = true;
        this.lastResults = null;
        const firstResults = await this.searchRepository.searchFirstPage(
          this.searchOptions
        );
        this.error = null;
        this.lastResults = firstResults;
        this.items = firstResults.items;
      } catch (e) {
        this.error = e;
      } finally {
        this.loading = false;
      }
    },
    async searchNext() {
      try {
        this.loadingNext = true;
        const nextResults = await this.searchRepository.searchNextPage(
          this.searchOptions
        );
        this.lastResults = nextResults;
        this.items.push(...nextResults.items);
        this.loadingNext = false;
      } catch (e) {
        console.log("Error Next...", e);
        this.errorNext = e;
      } finally {
        this.loadingNext = false;
        this.checkScrollPosition();
      }
    },
    handleSortChange({ field, order }) {
      const sort = this.buildSortQuery(field, order);
      this.$router.replace({
        query: {
          text: this.$route.query.text,
          sort,
        },
      });
    },
    buildSortQuery(sortField, sortOrder) {
      if (sortOrder === true) return sortField;
      if (sortOrder === false) return "-" + sortField;
      return null;
    },
    readSortQuery(sortQuery) {
      if (!sortQuery) return null;
      try {
        const regexSort = new RegExp(
          `(?<order>-?)(?<field>${FIELD_TRI_EFFECTIF}|${FIELD_TRI_DATE})`
        );
        const match = regexSort.exec(sortQuery);
        if (!match) return null;
        return {
          field: match.groups.field,
          order: match.groups.order === "-" ? false : true,
        };
      } catch (error) {
        console.log("url regEx error", error);
      }

      return null;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/app-colors.scss";

h3 {
  font-size: 130%;
  margin: 0;
  padding: 0;
}
h4 {
  font-size: 100%;
  margin: 0;
  padding: 0;
}
.layout-search {
  text-align: center;
  margin-top: 1rem;
  min-height: 30vh;
}
.layout-search-footer {
  height: 4rem;
}
.loading-indicator {
  transform: scale(0.4);
}
.error-message {
  color: $app-danger;
}
.result-count {
  margin: 1rem;
}
.result-count-number {
  font-weight: 600;
  color: $app-grey-light;
}
.next-results {
  text-align: center;
  // margin: 0 auto;
  color: gray;
  // margin: 1rem;
}
.end-results {
  text-align: center;
  color: gray;
  margin: 1rem;
}
.next-results-plachodler {
  text-align: center;
  line-height: 2rem;
  color: rgb(124, 124, 124);
  font-style: italic;
  margin: 1rem;
}
</style>

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
      <div class="error-message" v-if="error">
        Erreur lors de la recherche '{{ text }}' : {{ error }}
      </div>
      <div v-if="items">
        <h4>Résultats pour la recherche</h4>
        <h3 class="is-3">{{ text }}</h3>
        <h4 class="result-count">
          <span class="result-count-number">
            {{ totalItems }}
          </span>
          sociétés trouvées
        </h4>
        <CompanyList :companies="items" />
      </div>
    </div>
    <div v-if="nextSearchUrl" class="next-results-plachodler">
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
import CompanyList from "@/components/company/CompanyList.vue";
import SearchRepository from "@/repositories/search/SearchRepository";

// import SearchRepository from "@/repositories/search/SearchRepository.fake";

export default {
  components: {
    CompanyList,
  },
  data() {
    return {
      lastResults: null,
      items: null,
      loading: true,
      loadingNext: false,
      error: null,
      errorNext: null,
    };
  },
  created() {
    this.searchInitial();
  },
  mounted() {
    this.registerOnScroll();
  },
  computed: {
    text() {
      return this.$route.query.text;
    },
    totalItems() {
      if (!this.lastResults) return null;
      return this.lastResults.totalItems;
    },
    remainingResultsCount() {
      if (!this.totalItems || !this.items) return 0;
      return this.totalItems - this.items.length;
    },
    nextSearchUrl() {
      if (!this.lastResults || !this.lastResults.view) return null;
      return this.lastResults.view.next;
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
    checkScrollPosition() {
      try {
        if (
          this.loading ||
          this.loadingNext ||
          this.error ||
          !this.lastResults ||
          !this.lastResults.view ||
          !this.lastResults.view.next ||
          !this.items
        )
          return;
        const { clientHeight } = document.documentElement;
        const endOfContentHeight = this.$refs.searchBox.getBoundingClientRect()
          .bottom;
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
        const firstResults = await SearchRepository.searchCompaniesFromText(
          this.text
        );
        this.error = null;
        this.lastResults = firstResults;
        this.items = firstResults.member;
      } catch (e) {
        this.error = e;
      } finally {
        this.loading = false;
      }
    },
    async searchNext() {
      try {
        this.loadingNext = true;
        const nextResults = await SearchRepository.searchCompaniesFromUrl(
          this.nextSearchUrl
        );
        this.lastResults = nextResults;
        this.items.push(...nextResults.member);
        this.loadingNext = false;
      } catch (e) {
        console.log("Error Next...", e);
        this.errorNext = e;
      } finally {
        this.loadingNext = false;
        this.checkScrollPosition();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/apiviz-colors.scss";

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
  color: $apiviz-danger;
}
.result-count {
  margin: 1rem;
}
.result-count-number {
  font-weight: 600;
  color: $apiviz-grey-light;
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

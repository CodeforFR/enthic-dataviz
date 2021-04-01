<template>
  <div>
    <table v-if="companies" class="layout-search-table">
      <thead>
        <tr>
          <th>Dénomination</th>
          <th>Secteur (code APE)</th>
          <th>SIREN</th>
        </tr>
      </thead>
      <tr v-for="(company, index) in companies" :key="index">
        <td>
          <router-link class="result-link" :to="companyDetailRoute(company)">
            {{ company.denomination.value }}
          </router-link>
        </td>
        <td>
          {{ company.ape.value }}
        </td>
        <td>
          <router-link class="result-link" :to="companyDetailRoute(company)">
            {{ company.siren.value }}
          </router-link>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ["companies"],
  methods: {
    companyDetailRoute: (company) => ({
      name: "Detail",
      params: { siren: company.siren.value },
    }),
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/apiviz-colors.scss";

.layout-search-table {
  margin: 0 auto;
}

th,
td {
  padding: 0 0.5rem;
}
.result-link {
  font-weight: 560;
  text-decoration: underline;
  color: $apiviz-grey-light;

  &:hover {
    color: $apiviz-success;
  }
}
</style>

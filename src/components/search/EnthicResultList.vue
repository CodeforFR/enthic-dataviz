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
      name: "DetailComponent",
      params: { siren: company.siren.value },
    }),
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/app-colors.scss";

.layout-search-table {
  margin: 0 auto;
}

table th,
table td {
  padding: 0 0.5rem;
  text-align: left;
}
.result-link {
  font-weight: 600;
  text-decoration: underline;
  color: $app-grey-light;

  &:hover {
    color: $app-success;
  }
}
</style>

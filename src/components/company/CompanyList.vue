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
          <router-link :to="companyDetailRoute(company)">
            {{ company.denomination.value }}
          </router-link>
        </td>
        <td>
          {{ company.ape.value }}
        </td>
        <td>
          <router-link :to="companyDetailRoute(company)">
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

<style scoped>
.layout-search-table {
  margin: 0 auto;
}
</style>

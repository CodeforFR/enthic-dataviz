<template>
  <div>
    <table v-if="companies" class="layout-search-table">
      <thead>
        <tr>
          <th>Dénomination</th>
          <th>Effectif</th>
          <th>Secteur (code APE)</th>
          <th>Dates</th>
          <th>SIREN</th>
        </tr>
      </thead>
      <tr v-for="(company, index) in companies" :key="index">
        <td>
          <router-link class="result-link" :to="companyDetailRoute(company)">
            {{ getDenomination(company) }}
          </router-link>
        </td>
        <td>
          {{ getEffectif(company) }}
        </td>
        <td>
          {{ company.fields.classeetablissement }}({{
            company.fields.activiteprincipaleunitelegale
          }})
        </td>
        <td>
          {{ getDates(company) }}
        </td>
        <td>
          <router-link class="result-link" :to="companyDetailRoute(company)">
            {{ company.fields.siren }}
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
      params: { siren: company.fields.siren },
    }),
    effectifSortRoute() {
      var route = { ...this.$route };
      route.query["sort"] = "trancheeffectifsunitelegaletriable";
      return route;
    },
    getEffectif(company) {
      if (!company.fields.trancheeffectifsunitelegale) {
        return "Pas rempli";
      }
      var effectifMapping = {
        "00": "0 salarié⋅e",
        "01": "1 à 2 salarié⋅es",
        "02": "3 à 5 salarié⋅es",
        "03": "6 à 9 salarié⋅es",
        11: "10 à 19 salarié⋅es",
        12: "20 à 49 salarié⋅es",
        21: "50 à 99 salarié⋅es",
        22: "100 à 199 salarié⋅es",
        31: "200 à 249 salarié⋅es",
        32: "250 à 499 salarié⋅es",
        41: "500 à 999 salarié⋅es",
        42: "1 000 à 1 999 salarié⋅es",
        51: "2 000 à 4 999 salarié⋅es",
        52: "5 000 à 9 999 salarié⋅es",
        53: "10 000 salarié⋅es et plus",
      };
      var text = "";
      if (company.fields.trancheeffectifsunitelegale in effectifMapping) {
        text = effectifMapping[company.fields.trancheeffectifsunitelegale];
      } else {
        text = company.fields.trancheeffectifsunitelegale;
      }
      if (company.fields.anneeeffectifsunitelegale) {
        text += " ( en " + company.fields.anneeeffectifsunitelegale + ")";
      }
      return text;
    },
    getDenomination(company) {
      if (company.fields.denominationunitelegale) {
        return company.fields.denominationunitelegale;
      }
      var text = "";
      if (company.fields.prenomusuelunitelegale) {
        text += company.fields.prenomusuelunitelegale;
      }
      if (company.fields.nomunitelegale) {
        text += " " + company.fields.nomunitelegale;
      }
      if (company.fields.nomusageunitelegale) {
        text += " " + company.fields.nomusageunitelegale;
      }
      return text;
    },
    getDates(company) {
      return (
        "(" +
        company.fields.datecreationunitelegale +
        ")-(" +
        company.fields.datefermetureunitelegale +
        ")"
      );
    },
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
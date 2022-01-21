<template>
  <Widget
    :title="companyData.denomination.value"
    class="blue-border"
    titleColor="#536dfc"
  >
    <div class="tile is-parent">
      <div classe="tile is-child">
        <ul class="list-company-props m-30">
          <li v-for="(data, index) in flatData" :key="index">
            {{ data.description }} : {{ data.value }}
          </li>
          <li>{{ lastEffectif }}</li>
        </ul>
        <h3 class="is-3">
          Source officielle des données :
          <a
            class="inline-link"
            :href="`https://data.inpi.fr/entreprises/${flatData.siren.value}`"
          >
            data.inpi.fr
          </a>
        </h3>
        <h3 class="is-3">
          D'autres sources officielles :
          <a
            class="inline-link"
            :href="`https://entreprise.data.gouv.fr/sirene/${flatData.siren.value}`"
          >
            data.gouv.fr</a
          >
        </h3>
        <p>Autres sites présentant ces données :</p>
        <ul class="list-company-props m-30">
          <li>
            <a
              class="inline-link"
              :href="`https://societe.ninja/data.php?siren=${flatData.siren.value}`"
            >
              sur societe.ninja</a
            >
          </li>
          <li>
            <a
              class="inline-link"
              :href="`https://www.legaltile.com/search?q=${flatData.siren.value}`"
            >
              sur legaltile.com</a
            >
          </li>
          <li>
            <a
              class="inline-link"
              :href="`https://www.pappers.fr/recherche?q=${flatData.siren.value}`"
            >
              sur pappers.fr</a
            >
          </li>
        </ul>
      </div>
    </div>
  </Widget>
</template>

<script>
import Widget from "./Widget.vue";
import CSVRepository from "@/repositories/csv/CSVRepository";

export default {
  name: "CompanyIdentity",
  props: ["companyData"],
  components: { Widget },
  computed: {
    CsvCompanyUrl: function () {
      let url = CSVRepository.getCompanyFinancialDataUrl(
        this.companyData.siren.value
      );
      return url;
    },
    CsvApeUrl: function () {
      let url = CSVRepository.getApeFinancialDataUrl(this.companyData.ape.code);
      return url;
    },
    lastEffectif: function () {
      var lastEffectif = "Nombre de salarié⋅es non déclaré :-(";
      var lastYear = 0;
      for (var year in this.companyData.declarations) {
        var yearData = this.companyData.declarations[year];
        if (
          year > lastYear &&
          yearData.financial_data &&
          yearData.financial_data.YP
        ) {
          lastYear = year;
          lastEffectif =
            yearData.financial_data.YP.value +
            " salarié⋅es en moyenne sur " +
            year;
        }
      }
      return lastEffectif;
    },
    flatData: function () {
      const flatData = {};
      for (var property in this.companyData) {
        if (["siren", "ape", "postal_code", "town"].includes(property)) {
          flatData[property] = this.companyData[property];
        }
      }
      return flatData;
    },
  },
};
</script>

<style lang="scss" scoped>
.blue-border {
  border: solid 1px #536dfcb8;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(113, 108, 174, 0.09);
}
.list-company-props {
  list-style-type: circle;
}

.inline-link {
  padding-left: 0rem;
  padding-right: 0rem;
}
</style>

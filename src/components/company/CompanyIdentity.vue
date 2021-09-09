<template>
  <Widget :title="companyData.denomination.value" titleColor="#9999ff">
    <div class="tile is-parent">
      <div classe="tile is-child">
        <ul class="list-company-props m-30">
          <li v-for="(data, index) in companyData.flatData" :key="index">
            {{ data.description }} : {{ data.value }}
          </li>
          <li>{{ companyData.lastEffectif }}</li>
        </ul>
        <h3 class="is-3">
          Source officielle des données :
          <a
            class="inline-link"
            :href="`https://data.inpi.fr/entreprises/${companyData.flatData.siren.value}`"
          >
            data.inpi.fr
          </a>
        </h3>
        <h3 class="is-3">
          D'autres sources officielles :
          <a
            class="inline-link"
            :href="`https://entreprise.data.gouv.fr/sirene/${companyData.flatData.siren.value}`"
          >
            data.gouv.fr</a
          >
        </h3>
        <p>Autres sites présentant ces données :</p>
        <ul class="list-company-props m-30">
          <li>
            <a
              class="inline-link"
              :href="`https://societe.ninja/data.php?siren=${companyData.flatData.siren.value}`"
            >
              sur societe.ninja</a
            >
          </li>
          <li>
            <a
              class="inline-link"
              :href="`https://www.legaltile.com/search?q=${companyData.flatData.siren.value}`"
            >
              sur legaltile.com</a
            >
          </li>
          <li>
            <a
              class="inline-link"
              :href="`https://www.pappers.fr/recherche?q=${companyData.flatData.siren.value}`"
            >
              sur pappers.fr</a
            >
          </li>
        </ul>
      </div>
      <div class="tile is-child box">
        <h3 class="title is-5">Télécharger les données en csv</h3>
        <p>
          <a class="button is-primary" :href="`${CsvCompanyUrl}`">
            De l'entreprise {{ companyData.denomination.value }}
          </a>
        </p>
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
  },
};
</script>

<style lang="scss" scoped>
.list-company-props {
  list-style-type: circle;
}

.inline-link {
  padding-left: 0rem;
  padding-right: 0rem;
}
</style>

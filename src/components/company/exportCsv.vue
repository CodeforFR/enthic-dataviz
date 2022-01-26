<template>
  <p class="export-container">
    <a class="button" :href="`${CsvCompanyUrl}`">
      Exporter en CSV
      <!--  De l'entreprise {{ companyData.denomination.value }} -->
    </a>
  </p>
</template>

<script>
import CSVRepository from "@/repositories/csv/CSVRepository";

export default {
  name: "ExportCsv",
  props: ["companyData"],
  computed: {
    CsvCompanyUrl: function () {
      let url = CSVRepository.getCompanyFinancialDataUrl(
        this.companyData.siren.value
      );
      return url;
    },
  },
};
</script>

<style lang="scss">
.export-container {
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    background: #dfe4ff;
    color: #536dfc;
    font-weight: bold;
    transition-property: background-color, color;
    transition-duration: 0.1s;
    &:hover {
      background-color: #536dfc;
      color: #dfe4ff;
      transition-property: background-color, color;
      transition-duration: 0.1s;
    }
  }
}
</style>

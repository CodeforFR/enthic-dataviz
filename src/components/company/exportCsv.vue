<template>
  <p class="export-container">
    <a class="button is-primary" :href="`${CsvCompanyUrl}`">
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

<style>
.export-container {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

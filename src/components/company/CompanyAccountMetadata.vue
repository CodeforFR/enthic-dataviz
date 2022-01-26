<template>
  <div class="columns">
    <div class="column">
      <div class="box has-background-info">
        <h3 class="title is-12">
          Métadonnées autour des comptes de l'entreprise
        </h3>
        <div
          class="tile"
          v-for="(data, year) in companyData.declarations"
          :key="year"
        >
          <p>année {{ year }} :</p>
          <ul class="list-company-props m-30">
            <li>
              code motif : {{ data.metadata.code_motif.description }} (code
              {{ data.metadata.code_motif.value }})
            </li>
            <li>
              Confidentialité :
              {{ data.metadata.code_confidentialite.description }}
              (code
              {{ data.metadata.code_confidentialite.value }})
            </li>
            <li v-if="data.metadata.info_traitement.value">
              Information Traitement INPI : {{ data.metadata.info_traitement }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CompanyAccountMetadata",
  props: ["companyData"],

  computed: {
    detailToDisplay() {
      console.log(
        "detailToDisplay return false",
        this.companyData.declarations
      );
      return "toto";
    },
  },
};
</script>

<style lang="scss" scoped>
.list-company-props {
  list-style-type: none;
}

.inline-link {
  padding-left: 0rem;
  padding-right: 0rem;
}
</style>

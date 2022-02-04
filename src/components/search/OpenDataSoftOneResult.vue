<template>
  <div class="columns box my-1 p-0">
    <div class="column">
      <div class="company_denomination">
        {{ displayable_company.denomination }}
      </div>
      <div class="siren_number">SIREN : {{ displayable_company.siren }}</div>
    </div>
    <div class="column">
      <div class="company_main_info">
        {{ displayable_company.effectif.count }}
      </div>
      <div class="company_secondary_info">
        {{ displayable_company.effectif.annee }}
      </div>
    </div>
    <div class="column">
      <div class="company_main_info">
        {{ displayable_company.secteur.description }}
      </div>
      <div class="company_secondary_info">
        {{ displayable_company.secteur.code }}
      </div>
    </div>
    <div class="column company_secondary_info">
      <div class="company_main_info">
        {{ displayable_company.dates.creation }}
      </div>
      <div class="company_secondary_info">
        {{ displayable_company.dates.fermeture }}
      </div>
    </div>
    <div class="column company_main_info">
      {{ displayable_company.nature_juridique }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    displayable_company: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/app-colors.scss";
</style>

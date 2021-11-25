<template>
  <div class="columns box my-1 p-0">
    <div class="column">
      <div class="company_denomination">
        {{ displayable_company.denomination }}
      </div>
      <div class="siren_number">
        {{ displayable_company.siren }}
      </div>
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
        ({{ displayable_company.secteur.code }})
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

.company_denomination {
  font-family: Poppins;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: #536dfc;
}

.siren_number {
  font-family: OpenSans;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #636885;
}

.company_main_info {
  font-family: Poppins;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: #18097c;
}

.company_secondary_info {
  font-family: OpenSans;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #636885;
}
</style>

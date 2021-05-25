<template>
  <div class="columns" v-if="!companyData.comptesDeResultats">
    <div class="column">
      <div class="box has-background-info">
        <h3 class="title is-12">
          Aucun compte disponible pour cette entreprise
        </h3>
        <p>
          Peut-être pour des raisons de confidentialité ou de problème dans la
          saisie
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CompanyNoCompteDeResultats",
  props: ["companyData"],
};
</script>

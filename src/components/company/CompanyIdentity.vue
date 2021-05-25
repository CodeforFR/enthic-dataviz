<template>
  <Widget :title="companyData.denomination.value" titleColor="#9999ff">
    <ul class="list-company-props">
      <li v-for="(data, index) in companyData.flatData" :key="index">
        {{ data.description }} : {{ data.value }}
      </li>
      <li>{{ companyData.lastEffectif }}</li>
    </ul>
    <h3 class="is-3">
      Vérifiez les données de cette entreprise directement sur la
      <a
        class="inline-link"
        :href="`https://data.inpi.fr/entreprises/${companyData.flatData.siren.value}`"
      >
        page dédiée de l'INPI
      </a>
    </h3>
    <h3 class="is-3">
      Retrouvez d'autre données de cette entreprise sur le
      <a
        class="inline-link"
        :href="`https://entreprise.data.gouv.fr/sirene/${companyData.flatData.siren.value}`"
      >
        portail data.gouv.fr</a
      >
    </h3>
  </Widget>
</template>

<script>
import Widget from "./Widget.vue";

export default {
  name: "CompanyIdentity",
  props: ["companyData"],
  components: { Widget },
};
</script>

<style lang="scss" scoped>
.list-company-props {
  padding-left: 1em;
  line-height: 1.5em;
  list-style-type: circle;
}

.inline-link {
  padding-left: 0rem;
  padding-right: 0rem;
}
</style>

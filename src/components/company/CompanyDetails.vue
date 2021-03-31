<template>
  <div>
    <h1>Company details</h1>
    <div>siren: {{ company.siren.value }}</div>
    <div>denomination: {{ company.denomination.value }}</div>
    <div>ape: {{ company.ape.value }}</div>
    <div>postal_code: {{ company.postal_code.value }}</div>
    <div>town: {{ company.town.value }}</div>
    <div>devise: {{ company.devise.value }}</div>
    <div>
      <h1>DynamicDetail</h1>
      <DynamicDetail
        routeConfig="INVALID routeConfig"
        endPointConfig="INVALID endPointConfig"
        :company="company"
      />
    </div>
  </div>
</template>

<script>
import DynamicDetail from "./DynamicDetail";
export default {
  props: ["company"],
  components: {
    DynamicDetail,
  },
};
</script>

<style></style>

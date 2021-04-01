<template>
  <div class="layout-company-details">
    <DynamicDetail
      routeConfig="INVALID routeConfig"
      endPointConfig="INVALID endPointConfig"
      :companyData="companyData"
    />
  </div>
</template>

<script>
import DynamicDetail from "./DynamicDetail";
export default {
  props: ["companyData"],
  components: {
    DynamicDetail,
  },
};
</script>

<style lang="scss" scoped>
.layout-company-details {
  text-align: left;
}
</style>

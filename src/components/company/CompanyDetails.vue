<template>
  <div class="layout-company-details">
    <DynamicDetail v-if="companyData" :companyData="companyData" />
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

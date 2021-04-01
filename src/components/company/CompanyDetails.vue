<template>
  <div class="layout-company-details">
    <DynamicDetail
      routeConfig="INVALID routeConfig"
      endPointConfig="INVALID endPointConfig"
      :company="company"
    />
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

<style lang="scss" scoped>
.layout-company-details {
  text-align: left;
}
</style>

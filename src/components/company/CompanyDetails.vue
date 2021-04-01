<template>
  <div>
    <div>
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

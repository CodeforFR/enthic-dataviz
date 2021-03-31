<template>
  <div>
    <h1>Company details</h1>
    <div>
      {{ company.denomination.value }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["company"],
};
</script>

<style></style>

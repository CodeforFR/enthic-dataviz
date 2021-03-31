<template>
  <FetchCompany :siren="siren" />
</template>

<script>
import FetchCompany from "@/components/search/FetchCompany.vue";

export default {
  props: ["siren"],
  components: {
    FetchCompany,
  },
};
</script>

<style></style>

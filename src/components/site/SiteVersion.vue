<template>
  <div>version du site: {{ version }}</div>
</template>

<script>
import { version } from "../../../package.json";

export default {
  computed: {
    version: () => version,
  },
};
</script>

<style></style>

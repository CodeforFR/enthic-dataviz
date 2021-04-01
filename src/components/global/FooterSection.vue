<template>
  <footer class="layout">
    <div>
      Propulsé par
      <a href="https://www.enthic.fr/" class="enthic-name"> Enthic </a>
    </div>
    <SiteVersion />
  </footer>
</template>
<script>
import SiteVersion from "@/components/global/SiteVersion";

export default {
  components: {
    SiteVersion,
  },
};
</script>

<style scoped>
.enthic-name {
  text-decoration: underline;
  color: black;
  font-weight: bold;
}

.layout {
  padding: 1rem 0;
  text-align: center;
}
</style>

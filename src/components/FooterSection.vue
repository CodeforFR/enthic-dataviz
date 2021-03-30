<template>
  <footer>
    <div>
      Propulsé par
      <a href="https://www.enthic.fr/" class="enthic-name"> Enthic </a>
    </div>
    <SiteVersion />
  </footer>
</template>
<script>
import SiteVersion from "@/components/SiteVersion";

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

footer {
  padding: 1rem 0;
}
</style>

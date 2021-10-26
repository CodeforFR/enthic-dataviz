<template>
  <footer class="bottom-footer">
    <div class="content has-text-centered border-top">
      <p class="propulse">
        Propulsé par
        <strong>
          <a
            href="https://www.enthic.fr/"
            target="_blank"
            style="text-decoration: underline; color: white"
          >
            Enthic
          </a></strong
        >
      </p>
      <SiteVersion />
    </div>
  </footer>
</template>

<script>
import SiteVersion from "@/components/site/SiteVersion";

export default {
  components: {
    SiteVersion,
  },
};
</script>

<style lang="scss" scoped>
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

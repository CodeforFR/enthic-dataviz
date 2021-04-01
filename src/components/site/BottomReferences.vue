<template>
  <footer class="footer extra-footer" style="padding: 0px 0px 0px 0px">
    <div
      class="content has-text-centered has-text-white has-background-grey-dark"
      style="padding: 7px 0px 7px 0px"
    >
      <p>
        Propulsé par
        <strong>
          <a
            href="https://www.enthic.fr/"
            style="text-decoration: underline; color: white"
          >
            Enthic
          </a></strong
        >
        <SiteVersion />
      </p>
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

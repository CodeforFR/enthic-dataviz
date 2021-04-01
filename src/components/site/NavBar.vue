<template>
  <div class="nav">
    <router-link to="/">Enthic DataViz</router-link> |
    <router-link to="/recherche">Rechercher</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.nav {
  text-align: center;
  padding: 10px;
}

.nav a {
  font-weight: bold;
  color: #2c3e50;
}

.nav a.router-link-exact-active {
  color: #2c3e5085;
}
</style>

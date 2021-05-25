<template>
  <div class="navbar-layout">
    <router-link to="/"
      ><img src="@/assets/enthic.png" alt="Main logo" class="logo-enthic" />
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.navbar-layout {
  border-bottom: solid 1px darkgray;
}

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

.logo-enthic {
  margin: 0.3rem 0 0 1rem;
  width: 60px;
  // transform: scale(0.2);
}
</style>

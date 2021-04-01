<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Enthic DataViz</router-link> |
      <router-link to="/recherche">Rechercher</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
@import "@/assets/css/main.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 10px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #2c3e5085;
}

hr {
  border: none;
  display: block;
  height: 2px;
  margin: 1.5rem 0;
  background-color: #f5f5f5;
}

.container {
  margin: 0 auto;
}
</style>

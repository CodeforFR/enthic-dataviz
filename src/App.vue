<template>
  <div id="app">
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import NavBar from "@/components/global/NavBar";
export default {
  components: { NavBar },
};
</script>

<style lang="scss">
@import "@/assets/css/main.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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

<template>
  <div id="app">
    <NavBar />
    <router-view :key="$route.fullPath"></router-view>
    <FooterComponent />
    <BottomReferences />
  </div>
</template>

<script>
import NavBar from "@/components/site/NavBar";
import FooterComponent from "@/components/site/FooterComponent";
import BottomReferences from "@/components/site/BottomReferences";

export default {
  components: { NavBar, FooterComponent, BottomReferences },
};
</script>

<style lang="scss">
@import "@/assets/css/main.scss";

#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

hr {
  border: none;
  display: block;
  height: 2px;
  margin: 1.5rem 0;
  background-color: rgba(156, 164, 209, 0.16);
}

.box {
  background-color: none !important;
}
</style>

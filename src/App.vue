<template>
  <div id="app">
    <NavBar />
    <router-view />
    <Footer />
    <BottomReferences />
  </div>
</template>

<script>
import NavBar from "@/components/global/NavBar";
import Footer from "@/components/global/Footer";
import BottomReferences from "@/components/global/BottomReferences";

export default {
  components: { NavBar, Footer, BottomReferences },
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

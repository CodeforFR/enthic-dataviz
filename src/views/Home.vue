<template>
  <div>
    <h1>Enthic DataViz</h1>
    <h2>Explorez les données financières des entreprises françaises</h2>
    <h3 class="wip">en cours de développement...</h3>
    <a href="https://opencompaniesdata.netlify.app/" rel="alternate">
      <h3>retour à la version 1 (open companies data)</h3>
    </a>
    <PresentationSection />
    <PartnersSection />
    <FooterSection />
  </div>
</template>

<script>
import PresentationSection from "@/components/PresentationSection";
import PartnersSection from "@/components/PartnersSection";
import FooterSection from "@/components/FooterSection";

export default {
  name: "Home",
  components: { PresentationSection, PartnersSection, FooterSection },
};
</script>

<style scoped>
.wip {
  color: burlywood;
}
</style>

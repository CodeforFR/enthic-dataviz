<template>
  <div>
    <Header />
    <SearchBar />
    <PresentationSection />
    <PartnersSection />
    <FooterSection />
  </div>
</template>

<script>
import Header from "@/components/home/Header";
import SearchBar from "@/components/search/SearchBar";
import PresentationSection from "@/components/home/PresentationSection";
import PartnersSection from "@/components/global/PartnersSection";
import FooterSection from "@/components/global/FooterSection";

export default {
  name: "Home",
  components: {
    Header,
    SearchBar,
    PresentationSection,
    PartnersSection,
    FooterSection,
  },
};
</script>

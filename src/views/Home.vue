<template>
  <div>
    <TitleSection />
    <SearchBar />
    <PresentationSection />
    <PartnersSection />
  </div>
</template>

<script>
import TitleSection from "@/components/home/TitleSection";
import SearchBar from "@/components/search/SearchBar";
import PresentationSection from "@/components/home/PresentationSection";
import PartnersSection from "@/components/global/PartnersSection";

export default {
  name: "Home",
  components: {
    TitleSection,
    SearchBar,
    PresentationSection,
    PartnersSection,
  },
};
</script>

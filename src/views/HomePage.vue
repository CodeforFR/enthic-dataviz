<template>
  <div>
    <TitleSection />
    <PresentationSection />
    <PartnersSection />
    <iframe
      src="https://framaforms.org/envie-de-nous-rejoindre-1631199316"
      style="width: 100%; height:710px; border=0px; text-align: center; background-color: #F7F9FC; padding-top: 70px;"
    ></iframe>
  </div>
</template>

<script>
import PartnersSection from "@/components/home/PartnersSection";
import TitleSection from "@/components/home/TitleSection";
import PresentationSection from "@/components/home/PresentationSection";

export default {
  name: "HomePage",
  components: {
    PartnersSection,
    PresentationSection,
    TitleSection,
  },
};
</script>

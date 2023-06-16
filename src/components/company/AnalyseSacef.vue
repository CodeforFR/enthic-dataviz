<template>
  <div>
    <p>Analyse 2.0 en cours de formation</p>
    <main v-if="data">
      <AnalyseChiffreAffaires
        :data="DataforAnalyseChiffreAffaire"
      ></AnalyseChiffreAffaires>
      <AnalyseMasseSalariale
        :data="DataforAnalyseMasseSalariale"
      ></AnalyseMasseSalariale>
      <AnalyseBenefices :data="DataforAnalyseBenefices"></AnalyseBenefices>
      <AnalyseImpot :data="DataforAnalyseImpot"></AnalyseImpot>
    </main>
  </div>
</template>

<script>
import AnalyseChiffreAffaires from "@/components/analyses/AnalyseChiffreAffaires.vue";
import AnalyseMasseSalariale from "@/components/analyses/AnalyseMasseSalariale.vue";
import AnalyseBenefices from "@/components/analyses/AnalyseBenefices.vue";
import AnalyseImpot from "@/components/analyses/AnalyseImpot.vue";

export default {
  name: "AnalyseSacef",
  components: {
    AnalyseChiffreAffaires,
    AnalyseMasseSalariale,
    AnalyseBenefices,
    AnalyseImpot,
  },
  props: ["data"],
  computed: {
    DataforAnalyseChiffreAffaire() {
      console.log("DataforAnalyseChiffreAffaire", this.data);
      return this.data["ChiffreAffaires"];
    },
    DataforAnalyseBenefices() {
      return this.data["Benefices"];
    },
    DataforAnalyseImpot() {
      return this.data["Impot"];
    },
    DataforAnalyseMasseSalariale() {
      var masseSalarialeDansCA = {};
      for (var serieName in this.data["MasseSalariale"]) {
        masseSalarialeDansCA[serieName] = {};
        for (var year in this.data["MasseSalariale"][serieName]) {
          if (year in this.data["ChiffreAffaires"][serieName]) {
            masseSalarialeDansCA[serieName][year] =
              this.data["MasseSalariale"][serieName][year] /
              this.data["ChiffreAffaires"][serieName][year];
          }
        }
      }
      return {
        MasseSalariale: this.data["MasseSalariale"],
        MasseSalarialeDansCA: masseSalarialeDansCA,
      };
    },
  },
  methods: {},
};
</script>

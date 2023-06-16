<template>
  <div>
    <p>
      Grâce à oxfam qui a commandé au Basic une étude sur la répartition de la
      valeur au sein du SBF120 (les 120 plus grosses capitalisations boursières
      françaises), cette page a été rendue possible
    </p>
    <AnalyseSacef
      v-if="dataReceived == 3"
      :data="dataForAnalyseSacef"
    ></AnalyseSacef>
  </div>
</template>

<script>
import AnalyseSacef from "@/components/company/AnalyseSacef.vue";

import LeBasicRepository from "@/repositories/LeBasicRepository.js";

export default {
  name: "SBF120Study",
  components: {
    AnalyseSacef,
  },
  data: function () {
    return {
      dataReceived: 0,
      dataForAnalyseSacef: {
        ChiffreAffaires: {},
        MasseSalariale: {},
        Benefices: {},
        Impot: {},
      },
    };
  },
  beforeMount() {
    this.getOxfamData();
    var code_naf = "81.29A";
    LeBasicRepository.getDataForCodeNAF(code_naf).then((response) => {
      console.log("API le basic gave", response);
      this.dataForAnalyseSacef["ChiffreAffaires"][`Code NAF ${code_naf}`] =
        response;
      this.dataForAnalyseSacefReady = true;
      this.dataReceived += 1;
    });
  },
  methods: {
    async getOxfamData() {
      for (var regroupement of ["CAC40 en 2021", "SBF120 en 2021"]) {
        var response = await LeBasicRepository.getOxfamData(regroupement);
        console.log(`Oxfam data response for ${regroupement} is`, response);
        this.dataForAnalyseSacef.ChiffreAffaires[`le ${regroupement}`] =
          response.data["Net sales (RO)"];
        this.dataForAnalyseSacef.MasseSalariale[`le ${regroupement}`] =
          response.data["Personnel Expenses (RO)"];
        this.dataForAnalyseSacef.Benefices[`le ${regroupement}`] =
          response.data["Net Profit (part of the group) (RO)"];
        this.dataForAnalyseSacef.Impot[`le ${regroupement}`] =
          response.data["Income taxes (RO)"];
        this.dataReceived += 1;
      }
    },
    companyDetailRoute: (company) => ({
      name: "DetailComponent",
      params: { siren: company.siren },
    }),
  },
};
</script>

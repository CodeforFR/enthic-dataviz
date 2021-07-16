<template>
  <Widget
    title="Comparaison de l'impact social"
    titleColor="#99ff99"
    v-if="companyData"
  >
    <div class="control-bar">
      <div class="title is-6 m-r-30">Comparaison avec code APE :</div>
      <label v-for="ape in apeCodes" v-bind:key="ape" class="radio">
        <input
          type="radio"
          name="answer"
          v-bind:value="ape"
          v-model="APEToCompare"
          @change="updateAPEComparison"
        />
        {{ ape }}
      </label>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>Indicateur</th>
          <th
            v-for="(yearData, yearName) in companyData.declarations"
            v-bind:key="yearName"
          >
            {{ yearName }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(statType, statTypeId) in statistics"
          v-bind:key="statType.id"
        >
          <td>{{ statType.description }}</td>
          <td
            v-for="(value, year) in statType.values"
            class="statsValue"
            v-bind:style="{ color: getColor(statTypeId, year, value) }"
            v-bind:key="value.id"
          >
            <div class="tooltip">
              <span class="tooltiptext">{{
                getTooltip(statTypeId, year, value)
              }}</span>
              {{ value }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </Widget>
</template>

<script>
import Widget from "./Widget.vue";
import CompaniesRepository from "@/repositories/company/CompanyRepository";
import APERepository from "@/repositories/ape/APERepository";
import OntologyRepository from "@/repositories/ontology/OntologyRepository";

export default {
  name: "CompanySocialImpactComparison",
  template: "#item-template",
  props: {
    companyData: Object,
  },
  components: {
    Widget,
  },
  data: function () {
    return {
      percentiles: {},
      APEToCompare: this.companyData.ape.code,
      statistics: null,
    };
  },
  created() {
    this.initializeStatistics();
    this.updateAPEComparison();
  },
  computed: {
    apeCodes: function () {
      var companyApe = this.companyData.ape.code;
      while (companyApe.length < 4) {
        companyApe = "0" + companyApe;
      }
      return [
        companyApe,
        companyApe.substring(0, 3),
        companyApe.substring(0, 2),
      ];
    },
  },
  methods: {
    fillStatistics: function (statistics) {
      // Fill scores description with company's values
      for (var year in this.companyData.declarations) {
        var serverComputationNeeded = false;
        var yearData = this.companyData.declarations[year];
        for (var statType in statistics) {
          if ("statistics" in yearData && statType in yearData["statistics"]) {
            statistics[statType].values[year] =
              yearData["statistics"][statType].value.toPrecision(2);
          } else {
            statistics[statType].values[year] = "XXX";
            serverComputationNeeded = true;
          }
        }
        if (serverComputationNeeded) {
          console.log(
            "trigger server computation for company ",
            this.companyData.denomination.value,
            " and year ",
            year
          );
          CompaniesRepository.triggerServerComputation(
            this.companyData.denomination.value,
            year
          );
        }
      }
      return statistics;
    },
    initializeStatistics: async function () {
      // Get scores description
      let result = await OntologyRepository.getScores();
      for (var statType in result) {
        result[statType].values = {};
      }
      this.statistics = this.fillStatistics(result);
    },
    updateAPEComparison: function () {
      if (this.percentiles[this.APEToCompare] === undefined) {
        var asyncRequest = APERepository.getAPEScores(this.APEToCompare);
        const vm = this;
        asyncRequest.then((response) => {
          var newPercentile = {
            ...vm.percentiles,
            [vm.APEToCompare]: response.statistics,
          };
          vm.percentiles = newPercentile;
        });
      }
    },
    getDecile: function (statType, year, value) {
      if (
        this.percentiles[this.APEToCompare] === undefined ||
        this.percentiles[this.APEToCompare][year] === undefined ||
        this.percentiles[this.APEToCompare][year][statType] === undefined ||
        value == "XXX"
      ) {
        return -1;
      }
      var percentiles =
        this.percentiles[this.APEToCompare][year][statType].percentiles;
      for (var percentile in percentiles) {
        if (value < percentiles[percentile]) {
          return Math.round((percentile * 10) / 100);
        }
      }
      return 9;
    },
    getColor: function (statType, year, value) {
      var colorsGradient = [
        "#f80d01",
        "#f73302",
        "#f66403",
        "#f49404",
        "#F2C307",
        "#f1f108",
        "#BEEF09",
        "#8FED0C",
        "#63EC0D",
        "#37EA0E",
      ];
      var decile = this.getDecile(statType, year, value);
      if (decile == -1) {
        return "#111111";
      }
      return colorsGradient[decile];
    },
    getTooltip: function (statType, year, value) {
      var decile = this.getDecile(statType, year, value);
      if (decile >= 0) {
        return (
          "dans le décile " +
          decile +
          " parmis " +
          this.percentiles[this.APEToCompare][year][statType].total_count +
          " sociétés"
        );
      } else if (value == "XXX") {
        return "Calcul impossible";
      }
      return "Déciles pas (encore) calculés";
    },
  },
};
</script>

<style lang="scss">
.control-bar {
  margin: 0.5rem 0;
  border: solid 0px #aaa;
  border-radius: 8px;
  display: flex;
  justify-content: flex-start;
  line-height: 1rem;
}

.statsValue {
  font-weight: bold;
}

.tooltip:focus::before,
.tooltip:hover::before,
.tooltip.is-tooltip-active::before {
  z-index: 1;
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;

  /* Position the tooltip text */
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;

  /* Fade in tooltip */
  opacity: 0;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
</style>

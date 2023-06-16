<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent">
      <div class="tile is-child box">
        <p class="title">2) Analyse chiffre d'affaires</p>
        <p>
          Le graphique représente l'évolution du chiffre d'affaires (base 100 en
          {{ text_data["annePourBase100"] }}) pour
          {{ text_data["nomDesSeries"] }}
        </p>
      </div>
      <div class="tile is-child box">
        <BarChart
          :CHART_OPTIONS="this.CHART_OPTIONS"
          :options="graph_data"
        ></BarChart>
      </div>
    </div>
  </div>
</template>

<script>
import BarChart from "@/components/charts/BarChart";
import DataTransformation from "@/services/DataTransformation.js";

export default {
  name: "AnalyseChiffreAffaire",
  props: ["data"],
  components: {
    BarChart,
  },
  data: () => {
    return {
      CHART_OPTIONS: {
        enthic_options: {
          height: "350px",
        },
      },
      graph_data: null,
      text_data: {},
    };
  },
  beforeMount() {
    this.graph_data = this.compute_graph_data();
  },
  methods: {
    compute_graph_data() {
      console.log("analysechiffreaffaire data", this.data);
      var series = [];

      var rawSeries = Object.values(this.data);
      console.log(rawSeries);
      var annePourBase100 = DataTransformation.getFirstCommonYear(rawSeries);
      this.text_data["annePourBase100"] = annePourBase100;
      var xAxisValues = DataTransformation.getAllExistingYear(rawSeries);

      this.text_data["nomDesSeries"] = String(
        Object.keys(this.data).join(", et ")
      );
      for (var serieName in this.data) {
        var serie = {
          name: serieName,
          data: [],
          type: "line",
        };
        for (var year of xAxisValues) {
          if (year in this.data[serieName]) {
            serie.data.push(
              Math.round(
                (100 * this.data[serieName][year]) /
                  this.data[serieName][annePourBase100]
              )
            );
          } else {
            serie.data.push(null);
          }
        }
        series.push(serie);
      }
      console.log("series", series);
      return {
        title: {
          text: `Évolution du chiffre d'affaires en base 100 en ${annePourBase100}`,
        },
        tooltip: {
          order: "valueDesc",
          trigger: "axis",
          enterable: true,
        },
        animationDuration: 1000,
        xAxis: {
          type: "category",
          data: xAxisValues,
        },
        yAxis: {
          type: "value",
          name: "%",
          nameLocation: "end",
        },
        series: series,
      };
    },
  },
};
</script>

<template>
  <div class="has-background-info">
    <BarChart
      :CHART_OPTIONS="this.CHART_OPTIONS"
      :options="compute_transparency_score"
    ></BarChart>
  </div>
</template>

<script>
import BarChart from "@/components/charts/BarChart";

export default {
  name: "AnalyseTransparence",
  props: ["companyData"],
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
    };
  },
  computed: {
    compute_transparency_score() {
      var min_year = 2016;
      var current_year = new Date().getFullYear() - 1;
      var score = 0.0;
      var tooltip_text = "";
      for (var year = current_year; year > min_year; year--) {
        if (year in this.companyData.declarations) {
          var metadata = this.companyData.declarations[year].metadata;
          console.log(
            "metadata.code_confidentialite :",
            metadata.code_confidentialite
          );
          if (metadata.code_confidentialite.value == 0) {
            score += 1;
            tooltip_text += `${year} disponible<br>`;
          } else {
            score += 0.1;
            tooltip_text += `${year} confidentiel<br>`;
          }
        } else {
          tooltip_text += `${year} indisponible<br>`;
        }
      }
      return {
        tooltip: {
          formatter: tooltip_text,
        },
        series: [
          {
            name: "Pressure",
            type: "gauge",
            min: 0,
            max: current_year - min_year,
            progress: {
              show: true,
            },
            detail: {
              valueAnimation: true,
              formatter: "{value}",
            },
            data: [
              {
                value: score,
                name: "TRANSPARENCE",
              },
            ],
          },
        ],
      };
    },
  },
  methods: {},
};
</script>

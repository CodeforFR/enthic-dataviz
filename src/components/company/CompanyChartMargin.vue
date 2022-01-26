<template>
  <Widget
    title="Répartition du profit de l'entreprise"
    titleColor="#536dfc"
    v-if="chartDetails"
  >
    <div class="profit-elements-container">
      <p class="profit-description">
        Ce graphique montre comment la marge de l'entreprise sur son activité
        principale (résultat d'exploitation) est répartie entre : les salarié⋅es
        (participation), la collectivité (impôts), l’entreprise (bénéfices), les
        créanciers, les marchés, etc... (Résultats financier et exceptionnel).
        Un montant positif signifie que l'entreprise a donné de l'argent à
        l'acteur économique en question, un montant négatif signifie que
        l'acteur économique donne de l'argent à l'entreprise.
      </p>
      <BarChart
        class="canvas-profit"
        :CHART_OPTIONS="this.CHART_OPTIONS"
        :options="chartDetails.optionsChartMargin"
      ></BarChart>
    </div>
  </Widget>
</template>

<script>
import Widget from "./Widget.vue";
import BarChart from "@/components/charts/BarChart";

export default {
  name: "CompanyChartMargin",
  data: () => {
    return {
      CHART_OPTIONS: {
        color: [
          "#ff926b",
          "#536dfc",
          "#00bfc7",
          "#ff4a4a",
          "#CC2581",
          "#47E26F",
        ],
        grid: {
          bottom: "20%",
          right: "0%",
          left: "15%",
        },
        xAxis: {
          type: "category",
        },
        yAxis: {
          type: "value",
          nameLocation: "right",
          nameGap: 50,
        },
        legend: {
          orient: "horizontal",
          width: "100%",
          x: "10%", //The legend can be set to the left, right and center
          y: "bottom", //You can set the legend to be on top, bottom, and center
          formatter: "{a|{name}}",
          textStyle: {
            color: "#1B1B4E",
            rich: {
              a: {
                fontSize: 12,
              },
            },
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        label: {
          normal: {
            show: true,
            position: "top",
          },
        },
        series: [
          {
            type: "bar",
            barCategoryGap: "20%",
          },
        ],
      },
    };
  },
  props: ["chartDetails"],
  components: {
    BarChart,
    Widget,
  },
};
</script>

<style lang="scss" scoped>
ul {
  list-style-type: circle;
}
.profit-elements-container {
  display: flex;
}
.profit-description {
  width: 30%;
  padding-top: 4%;
}
.canvas-profit {
  width: 100%;
}
</style>

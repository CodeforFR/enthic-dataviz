<template>
  <Widget
    title="Répartition du chiffre d'affaire"
    titleColor="#536dfc"
    v-if="chartDetails"
  >
    <p class="description-chart-ca">
      Ce graphique montre la répartition des charges payées par le chiffre
      d'affaire de l'entreprise. La hauteur de chaque colonne correspond au
      chiffre d'affaire.
    </p>

    <BarChart
      :CHART_OPTIONS="this.CHART_OPTIONS"
      :options="chartDetails.optionsChartCA"
      :isStacked="true"
    ></BarChart>
    <div v-if="chartDetails.listOfUndisplayableData.length > 0">
      <p class="title is-6">Listes des problèmes pour afficher le graphique</p>
      <ul class="m-30">
        <li
          v-for="(item, index) in chartDetails.listOfUndisplayableData"
          :key="index"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </Widget>
</template>

<script>
import Widget from "./Widget.vue";
import BarChart from "@/components/charts/BarChart";

export default {
  name: "CompanyChartCA",
  props: ["chartDetails"],
  data: () => {
    return {
      CHART_OPTIONS: {
        color: [
          "#00BFC7",
          "#514BD3",
          "#9089FA",
          "#E8871B",
          "#CC2581",
          "#47E26F",
        ],
        grid: {
          top: "40%",
        },
        xAxis: {
          type: "category",
        },
        yAxis: {
          type: "value",
          nameLocation: "middle",
          nameGap: 50,
        },
        legend: {
          orient: "horizontal",
          width: "40%",
          x: "middle", //The legend can be set to the left, right and center
          y: "top", //You can set the legend to be on top, bottom, and center
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

.description-chart-ca {
  width: 60%;
}
</style>

<template>
  <div class="chart__container">
    <v-chart class="chart" :option="chartOptions" ref="barChart" />
  </div>
</template>

<script>
import { use } from "echarts/core";
import { merge } from "lodash";

import { CanvasRenderer } from "echarts/renderers";
import { BarChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from "echarts/components";

import VChart, { THEME_KEY } from "vue-echarts";
use([
  CanvasRenderer,
  BarChart,
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);
const DEFAULT_SERIE_TYPE = "bar";
const DEFAULT_COLOR_SCHEMA = [
  "#00BFC7",
  "#514BD3",
  "#9089FA",
  "#E8871B",
  "#CC2581",
  "#47E26F",
];

const DEFAULT_CHART_OPTIONS = {
  color: DEFAULT_COLOR_SCHEMA,
  grid: {
    right: "20%",
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
    orient: "vertical",
    width: "40%",
    x: "right", //The legend can be set to the left, right and center
    y: "top", //You can set the legend to be on top, bottom, and center
    align: "left",
    formatter: "{a|{name}}",
    textStyle: {
      color: "#1B1B4E",
      padding: [0, 0, 0, 0],
      rich: {
        a: {
          fontSize: 12,
          padding: 5,
          lineHeight: 14,
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
      barCategoryGap: "10%",
    },
  ],
};

export default {
  name: "BarChart",
  components: {
    VChart,
  },
  provide: {
    [THEME_KEY]: "light",
  },
  props: {
    options: {
      type: Object,
      required: true,
    },
    isStacked: {
      default: false,
      required: false,
      type: Boolean,
    },
  },
  computed: {
    chartOptions: {
      get() {
        this.processingSeries();
        let options = this.updateChartOptions();
        return options;
      },
      set() {
        return this.updateChartOptions();
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    breakLine(str) {
      /* Break words if the string contains a certain length  */
      const DEFAULT_LINE_BREAK = 20;
      if (str.length < DEFAULT_LINE_BREAK) return str;
      return str.replace(/(.{1,20})(?:\n|$| )/g, "$1\n");
    },
    processingSeries() {
      /*
        Process the series before adding data to the chart
       */
      if (!this.options.series) return;
      this.options.series.forEach((serie) => {
        // adding a chart type
        if (!serie.type) serie.type = DEFAULT_SERIE_TYPE;
        serie.name = this.breakLine(serie.name);
        // adding the stacking bar
        if (!serie.stack && this.isStacked) serie.stack = "one";
        // adding the label
        if (!serie.label) serie.label = { show: true };
      });
    },
    updateChartOptions() {
      return merge({}, DEFAULT_CHART_OPTIONS, this.options);
    },
  },
  mounted() {
    this.chartOptions = DEFAULT_CHART_OPTIONS;
  },
};
</script>

<style scoped>
.chart__container {
  width: 900px;
  height: 500px;
}
@media (min-width: 768px) and (max-width: 1023px) {
  .chart__container {
    width: 740px;
    height: 350px;
  }
}
@media screen and (max-width: 767px) {
  .chart__container {
    width: 80vw;
    height: 350px;
  }
}
</style>

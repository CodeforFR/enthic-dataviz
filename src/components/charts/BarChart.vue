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
    bottom: "bottom",
    marginTop: -50,
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
    chartOptions() {
      /* We need to */
      this.processingSeries();
      return this.updateChartOptions();
    },
  },
  data() {
    return {};
  },
  methods: {
    processingSeries() {
      /*
        Process the series before adding data to the chart
       */
      if (!this.options.series) return;
      this.options.series.forEach((serie) => {
        // adding a chart type
        if (!serie.type) serie.type = DEFAULT_SERIE_TYPE;
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
</style>

<template>
  <div class="chart__container_n" :style="{ height: div_height }">
    <v-chart class="chart" :option="chartOptions" ref="barChart" />
  </div>
</template>

<script>
import { use } from "echarts/core";
import { merge } from "lodash";

import { CanvasRenderer } from "echarts/renderers";
import { BarChart } from "echarts/charts";
import { GaugeChart } from "echarts/charts";
import { LineChart } from "echarts/charts";
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
  GaugeChart,
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  LineChart,
]);
const DEFAULT_SERIE_TYPE = "bar";

export default {
  name: "BarChart",
  components: {
    VChart,
  },
  provide: {
    [THEME_KEY]: "light",
  },
  props: {
    CHART_OPTIONS: {},
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
    return {
      div_height: null,
    };
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
      return merge({}, this.CHART_OPTIONS, this.options);
    },
  },
  beforeMount() {
    if ("enthic_options" in this.CHART_OPTIONS) {
      this.div_height = this.CHART_OPTIONS.enthic_options.height;
    }
    this.chartOptions = this.CHART_OPTIONS;
  },
};
</script>

<style scoped>
.chart__container {
  /*  width: 900px;*/
  height: 500px;
}
@media (min-width: 768px) and (max-width: 1023px) {
  .chart__container {
    width: 740px;
    height: 100%;
  }
}
@media screen and (max-width: 767px) {
  .chart__container {
    width: 80vw;
    height: 100%;
  }
}
</style>

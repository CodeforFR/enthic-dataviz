export const CHART_OPTIONS = {
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
    x: "right", //The legend can be set to the left, right and center
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
};
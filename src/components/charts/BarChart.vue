<template>
  <apexchart
    type="bar"
    height="350"
    :options="options"
    :series="series"
  ></apexchart>
</template>

<script>
export default {
  name: "BarChart",
  props() {
    return {
      options: {
        type: Object,
        required: true,
        default: {
          chart: {
            type: "bar",
            height: 350,
            stacked: false,
            toolbar: {
              show: true,
            },
            zoom: {
              enabled: false,
            },
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                legend: {
                  position: "bottom",
                  offsetX: -10,
                  offsetY: 0,
                },
              },
            },
          ],
          plotOptions: {
            bar: {
              horizontal: false,
            },
          },
          xaxis: {},
          yaxis: {
            title: {
              style: {
                color: "#008FFB",
              },
            },
          },
          legend: {
            position: "right",
            offsetY: 40,
          },
          fill: {
            opacity: 1,
          },
        },
      },
      series: {
        type: Object,
        required: true,
      },
    };
  },
};
</script>

<style scoped></style>

<template>
  <Widget title="Autres données" titleColor="#536dfc" v-if="companyData">
    <div class="m-l-30 m-b-20" v-for="(year, index) in yearData" :key="index">
      <span class="title is-6">
        {{ year.year }}
      </span>
      <ul class="m-l-30">
        <li v-for="(data, index) in year.data" :key="index">
          {{ data.description }} : {{ data.value }}
        </li>
      </ul>
    </div>
  </Widget>
</template>

<script>
import Widget from "./Widget.vue";

export default {
  name: "CompanyOtherData",
  props: ["companyData"],
  components: {
    Widget,
  },
  computed: {
    yearData: function () {
      var formatter = new Intl.NumberFormat(undefined, {
        minimumFractionDigits: 0,
      });
      const result = [];

      for (let year in this.companyData.declarations) {
        let yearDataItem = {
          year: year,
          data: {},
        };
        let yearData = this.companyData.declarations[year];
        for (var yearProp in yearData.financial_data) {
          yearDataItem.data[yearProp] = {
            description: yearData.financial_data[yearProp].description,
            value: formatter.format(yearData.financial_data[yearProp].value),
          };
        }
        result.push(yearDataItem);
      }
      return result;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/app-colors.scss";
@import "../../assets/css/app-misc.scss";

ul {
  list-style-type: circle;
}
</style>

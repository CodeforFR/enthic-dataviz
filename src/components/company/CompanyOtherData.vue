<template>
  <Widget title="Autres données" titleColor="#ff99ff" v-if="companyData">
    <div
      class="m-l-30 m-b-20"
      v-for="(year, index) in companyData.yearData"
      :key="index"
    >
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
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/app-colors.scss";
@import "../../assets/css/app-misc.scss";

ul {
  list-style-type: circle;
}
</style>

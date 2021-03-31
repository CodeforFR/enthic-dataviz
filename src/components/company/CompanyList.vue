<template>
  <div>
    <ul>
      <li v-for="(company, index) in companies" :key="index">
        <CompanyListItem :company="company" />
      </li>
    </ul>
  </div>
</template>

<script>
import CompanyListItem from "@/components/company/CompanyListItem.vue";

export default {
  props: ["companies"],
  components: {
    CompanyListItem,
  },
};
</script>

<style></style>

<template>
  <a class="result-link" @click="toggleSort">
    <span>
      {{ name }}
    </span>
    <span v-if="sort === false">
      <span class="icon icon-1">
        <i class="fas fa-caret-down"></i>
      </span>
    </span>
    <span v-else-if="sort === true">
      <span class="icon icon-1">
        <i class="fas fa-caret-up"></i>
      </span>
    </span>
  </a>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    sort: {
      type: Boolean,
      default: null,
      required: false,
    },
  },
  methods: {
    toggleSort() {
      const sort = this.rollSortValue(this.sort);
      this.$emit("sortChanged", sort);
    },
    rollSortValue(currentValue) {
      if (currentValue === null || currentValue === "") return true;
      if (currentValue === true) return false;
      return null;
    },
  },
};
</script>

<style scoped>
.icon-1 {
  height: 1rem;
  width: 1rem;
}
</style>

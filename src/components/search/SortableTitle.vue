<template>
  <a class="result-link" @click="toggleSort">
    <span>
      {{ name }}
    </span>
    <span v-if="sortOrder === false">
      <span class="icon icon-1">
        <i class="fas fa-caret-down"></i>
      </span>
    </span>
    <span v-else-if="sortOrder === true">
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
    sortOrder: {
      type: Boolean,
      default: null,
      required: false,
    },
  },
  methods: {
    toggleSort() {
      const newSortOrder = this.rollSortValue(this.sortOrder);
      this.$emit("sortOrderChanged", newSortOrder);
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

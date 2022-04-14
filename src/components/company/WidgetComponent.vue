<template>
  <div class="container">
    <div class="column">
      <div class="widget-box">
        <h3 class="title is-3 widget-title" :style="titleStyle">{{ title }}</h3>
        <div class="widget-content">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WidgetComponent",
  props: {
    title: String,
    titleColor: String,
  },
  computed: {
    titleStyle() {
      return { color: this.titleColor };
    },
  },
};
</script>

<style lang="scss" scoped>
.widget-box {
  padding: 0;
}

.widget-title {
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  border-radius: 6px 6px 30px 30px;
}

.widget-content {
  padding: 0.75rem;
}
</style>

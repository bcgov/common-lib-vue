<template>
  <div class="page-content" :style="pageContentStyles">
    <slot>Page content here.</slot>
  </div>
</template>

<script>
export default {
  name: "PageContent",
  props: {
    deltaHeight: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    pageContentStyles() {
      return {
        "min-height": `calc(100vh - ${this.deltaHeight}px)`,
      };
    },
  },
};
</script>

<style>
@media print {
  .page-content {
    min-height: auto !important;
  }
}
</style>

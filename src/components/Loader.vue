<template>
  <div
    :class="className"
  >
    <div
      class="bcgov-btn-loader"
      :style="{color: color, width: size, height: size}"
    />
  </div>
</template>

<script>
export default {
  name: 'LoaderComponent',
  props: {
    color: {
      type: String,
      default: '#FFF',
    },
    size: {
      type: String,
      default: '15px',
    },
    className: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped>
.bcgov-btn-loader {
  border: 2px solid;
  border-radius: 50%;
  border-top-color: transparent;
  animation: rotate 2s linear infinite;
  display: inline-block;
  vertical-align: text-top;
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

<template>
  <!-- Using fall-through attributes, see here: https://vuejs.org/guide/components/attrs.html#attribute-inheritance -->
  <component
    :is="tag"
  >
    <slot />
  </component>
</template>

<script>
export default {
  name: 'DynamicTagWrapper',
  props: {
    tag: {
      type: String,
      required: true,
    },
  },
};
</script>

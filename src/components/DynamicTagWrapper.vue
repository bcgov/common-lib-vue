<template>
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

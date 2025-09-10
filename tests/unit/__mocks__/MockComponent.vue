<template>
  <div class="test" />
</template>

<script>
/**
 * Return a component to be used as dummy in order
 * to mock things like mixins.
 */
export default {
  name: "MockComponent",
  props: {
    cypressId: {
      type: String,
      default: null,
    },
  },
};
</script>

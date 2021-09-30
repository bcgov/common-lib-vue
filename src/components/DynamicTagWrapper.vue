<script>
export default {
  name: 'DynamicTagWrapper',
  render(createElement) {
    return createElement(
      this.tag, // Tag name.
      {
        attrs: this.$attrs,
        on: this.$listeners,
      },
      this.$slots.default // Array of children.
    );
  },
  props: {
    tag: {
      type: String,
      required: true,
    },
  },
};
</script>

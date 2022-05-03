export default {
  methods: {
    handleBlur(event) {
      this.$emit('blur', event);
    }
  },
  emits: ['blur']
};

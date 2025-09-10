export default {
  props: {
    cypressId: {
      type: String,
      default: "",
    },
  },
  methods: {
    getCypressValue(argument) {
      //if no cypressId prop passed to component calling the mixin, don't add a data-cy tag
      if (!this.cypressId) {
        return null;
      }
      //argument can't be zero because loop indexes generally start with 0
      //and type coercion will cause that to show up as falsy
      //so this way you can pass loop indexes directly without problems
      if (!argument && argument !== 0) {
        return this.cypressId;
      }
      //otherwise return the cypressId with the argument tacked onto the end
      return this.cypressId + argument;
    },
  },
};

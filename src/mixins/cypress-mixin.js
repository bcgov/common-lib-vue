export default {
  methods: {
    cyValue(argument) {
      //if no cypressId prop passed to component calling the mixin, don't add a data-cy tag
      if (!this.cypressId) {
        return null;
      }
      //if no argument, just return the cypressId passed to the component
      if (!argument) {
        return this.cypressId;
      }
      //otherwise return the cypressId with the argument tacked onto the end
      return this.cypressId + argument;
    },
  },
};

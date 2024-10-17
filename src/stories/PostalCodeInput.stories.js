import PostalCodeInput from "../../src/components/PostalCodeInput.vue";

export default {
  title: "Components/PostalCodeInput",
  component: PostalCodeInput,
  argTypes: {},
};

const Template = (args) => ({
  components: { PostalCodeInput },
  setup() {
    return { args };
  },
  template: '<PostalCodeInput v-bind="args" />',
});

export const Example = Template.bind({});
Example.args = {
  label: "My Label:",
};

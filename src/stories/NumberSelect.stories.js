import NumberSelect from "../../src/components/NumberSelect.vue";

export default {
  title: "Components/NumberSelect",
  component: NumberSelect,
  argTypes: {},
};

const Template = (args) => ({
  components: { NumberSelect },
  setup() {
    return { args };
  },
  data() {
    return {
      value: null,
    };
  },
  template: '<NumberSelect v-bind="args" v-model="value" />',
});

export const Example = Template.bind({});
Example.args = {
  label: "My Label:",
  min: 1,
  max: 10,
};

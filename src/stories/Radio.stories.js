import Radio from "../components/RadioComponent.vue";

export default {
  title: "Components/Radio",
  component: Radio,
  argTypes: {},
};

const Template = (args) => ({
  components: { Radio },
  setup() {
    return { args };
  },
  data() {
    return {
      val: null,
    };
  },
  // v-model is required for proper radio input behavior
  template: '<Radio v-bind="args" v-model="val" />',
});

export const Example = Template.bind({});
Example.args = {
  label: "My Label:",
  items: [
    {
      id: "yes",
      label: "Yes",
      value: "Y",
    },
    {
      id: "no",
      label: "No",
      value: "N",
    },
  ],
};

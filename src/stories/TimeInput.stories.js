import TimeInput from "../../src/components/TimeInput.vue";

export default {
  title: "Components/TimeInput",
  component: TimeInput,
  argTypes: {},
};

const Template = (args) => ({
  components: { TimeInput },
  setup() {
    return { args };
  },
  template: '<TimeInput v-bind="args" />',
});

export const Example = Template.bind({});
Example.args = {
  label: "My Label:",
};

export const TwoDigitHourExample = Template.bind({});
TwoDigitHourExample.args = {
  label: "My Label:",
  isHourTwoDigits: true,
  value: {
    hour: "01",
    minute: "01",
  },
};

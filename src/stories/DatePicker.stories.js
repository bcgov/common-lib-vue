import DatePicker from "../../src/components/DatePicker.vue";

export default {
  title: "Components/DatePicker",
  component: DatePicker,
  argTypes: {},
};

const Template = (args) => ({
  components: { DatePicker },
  setup() {
    return { args };
  },
  template: '<DatePicker v-bind="args" />',
});

export const Example = Template.bind({});

import CheckboxGroup from "../../src/components/CheckboxGroup.vue";

export default {
  title: "Components/CheckboxGroup",
  component: CheckboxGroup,
  argTypes: {},
};

const Template = (args) => ({
  components: { CheckboxGroup },
  setup() {
    return { args };
  },
  data: () => ({
    value: ["apple"],
  }),
  template: '<CheckboxGroup v-bind="args" v-model="value" />',
});

export const Example = Template.bind({});
Example.args = {
  id: "my-checkbox",
  items: [
    {
      id: "apple",
      value: "apple",
      label: "Apple Sauce in a cup",
    },
    {
      id: "orange",
      value: "orange",
      label: "Orange Juice in a jug",
      disabled: true,
    },
    {
      id: "banana",
      value: "banana",
      label: "Banana in a bundle",
    },
  ],
};

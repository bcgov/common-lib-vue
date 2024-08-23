import CountrySelect from "../../src/components/CountrySelect.vue";

export default {
  title: "Components/CountrySelect",
  component: CountrySelect,
  argTypes: {},
};

const Template = (args) => ({
  components: { CountrySelect },
  setup() {
    return { args };
  },
  template: '<CountrySelect v-bind="args" />',
});

export const Example = Template.bind({});

// const mediumStyles = {
//   width: "350px",
//   maxWidth: "100%",
// };

Example.args = {
  label: "My Country:",
  id: "country",
  // inputStyle: mediumStyles,
};

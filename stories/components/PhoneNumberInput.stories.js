import PhoneNumberInput from '../../src/components/PhoneNumberInput.vue';

export default {
  title: 'Components/PhoneNumberInput',
  component: PhoneNumberInput,
  argTypes: {},
};

const Template = (args) => ({
  components: { PhoneNumberInput },
  setup() { return { args }; },
  template: '<PhoneNumberInput v-bind="args" />',
});

export const Example = Template.bind({});
Example.args = {
  label: 'My Label:',
};

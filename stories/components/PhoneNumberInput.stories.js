import PhoneNumberInput from '../../src/components/PhoneNumberInput.vue';

export default {
  title: 'Components/PhoneNumberInput',
  component: PhoneNumberInput,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { PhoneNumberInput },
  template: '<PhoneNumberInput v-bind="$props" />',
});

export const Example = Template.bind({});
Example.args = {
  label: 'My Label:',
};

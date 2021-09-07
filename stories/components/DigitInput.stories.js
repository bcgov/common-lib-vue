import DigitInput from '../../src/components/DigitInput.vue';

export default {
  title: 'Components/DigitInput',
  component: DigitInput,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { DigitInput },
  template: '<DigitInput v-bind="$props" />',
});

export const Example = Template.bind({});
Example.args = {
  label: 'My Label:',
};

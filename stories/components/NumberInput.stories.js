import NumberInput from '../../src/components/NumberInput.vue';

export default {
  title: 'Components/NumberInput',
  component: NumberInput,
  argTypes: {},
};

const Template = (args, { argTypes, }) => ({
  props: Object.keys(argTypes),
  components: { NumberInput, },
  template: '<NumberInput v-bind="$props" />',
});

export const Example = Template.bind({});
Example.args = {
  label: 'My Label:',
};

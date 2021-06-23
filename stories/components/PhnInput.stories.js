import PhnInput from '../../src/components/PhnInput.vue';

export default {
  title: 'Components/PhnInput',
  component: PhnInput,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { PhnInput },
  template: '<PhnInput v-bind="$props" />',
});

export const Example = Template.bind({});
Example.args = {
  label: 'My Label:',
};

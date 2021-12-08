import SINInput from '../../src/components/SINInput.vue';

export default {
  title: 'Components/SINInput',
  component: SINInput,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SINInput },
  template: '<SINInput v-bind="$props" />',
});

export const Example = Template.bind({});
Example.args = {
  label: 'My Label:',
};

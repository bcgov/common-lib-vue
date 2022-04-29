import SINInput from '../../src/components/SINInput.vue';

export default {
  title: 'Components/SINInput',
  component: SINInput,
  argTypes: {},
};

const Template = (args) => ({
  components: { SINInput },
  setup() { return { args }; },
  template: '<SINInput v-bind="args" />',
});

export const Example = Template.bind({});
Example.args = {
  label: 'My Label:',
};

import Textarea from '../../src/components/Textarea.vue';

export default {
  title: 'Components/Textarea',
  component: Textarea,
  argTypes: {},
};

const Template = (args) => ({
  components: { Textarea },
  setup() { return { args }; },
  template: '<Textarea v-bind="args" />',
});

export const Example = Template.bind({});
Example.args = {
  label: 'My Textarea:',
};

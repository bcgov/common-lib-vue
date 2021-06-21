import Textarea from '../../src/components/Textarea.vue';

export default {
  title: 'Components/Textarea',
  component: Textarea,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Textarea },
  template: '<Textarea v-bind="$props" />',
});

export const Example = Template.bind({});
Example.args = {
  label: 'My Textarea:',
};

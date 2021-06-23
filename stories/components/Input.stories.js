import Input from '../../src/components/Input.vue';

export default {
  title: 'Components/Input',
  component: Input,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Input },
  template: '<Input v-bind="$props" />',
});

export const Example = Template.bind({});
Example.args = {
  label: 'My Label:',
};

import Button from '../../components/Button.vue';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Button },
  template: '<Button v-bind="$props" />',
});

export const Example = Template.bind({});
Example.args = {
  label: 'My Button',
};

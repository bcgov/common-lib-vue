import Footer from '../../src/components/Footer.vue';

export default {
  title: 'Components/Footer',
  component: Footer,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Footer },
  template: '<Footer v-bind="$props" />',
});

export const Example = Template.bind({});
Example.args = {
  version: 'v1.0.0'
};

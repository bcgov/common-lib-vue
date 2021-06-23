import Loader from '../../src/components/Loader.vue';

export default {
  title: 'Components/Loader',
  component: Loader,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Loader },
  template: '<Loader v-bind="$props" />',
});

export const Example = Template.bind({});
Example.args = {
  size: '50px',
  color: 'black'
};

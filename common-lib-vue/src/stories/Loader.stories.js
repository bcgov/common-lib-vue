import Loader from '../../src/components/Loader.vue';

export default {
  title: 'Components/Loader',
  component: Loader,
  argTypes: {},
};

const Template = (args) => ({
  components: { Loader, },
  setup() {return { args, } },
  template: '<Loader v-bind="args" />',
});

export const Example = Template.bind({});
Example.args = {
  size: '50px',
  color: 'black',
};

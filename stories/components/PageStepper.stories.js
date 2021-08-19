import PageStepper from '../../src/components/PageStepper.vue';

export default {
  title: 'Components/PageStepper',
  component: PageStepper,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { PageStepper },
  template: '<PageStepper v-bind="$props" />',
});

export const Example = Template.bind({});
Example.args = {
  currentPath: '/page-c',
  routes: [
    {
      path: '/page-a',
      title: 'Page A'
    },
    {
      path: '/page-b',
      title: 'Page B'
    },
    {
      path: '/page-c',
      title: 'Page C'
    },
    {
      path: '/page-d',
      title: 'Page D'
    },
    {
      path: '/page-e',
      title: 'Page E'
    }
  ],
};

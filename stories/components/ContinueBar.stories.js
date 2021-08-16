import ContinueBar from '../../src/components/ContinueBar.vue';

export default {
  title: 'Components/ContinueBar',
  component: ContinueBar,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ContinueBar },
  template: '<ContinueBar v-bind="$props" />',
});

export const Example = Template.bind({});

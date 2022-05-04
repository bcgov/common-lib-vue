import ContinueBar from '../../src/components/ContinueBar.vue';

export default {
  title: 'Components/ContinueBar',
  component: ContinueBar,
  argTypes: {},
};

const Template = (args) => ({
  setup() { return { args }; },
  components: { ContinueBar },
  template: '<ContinueBar v-bind="args" />',
});

export const Example = Template.bind({});

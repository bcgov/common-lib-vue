import Button from '../../src/components/Button.vue';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    color: {
      options: ['blue', 'white', 'gold'],
      control: { type: 'select' },
    }
  },
};

const Template = (args) => ({
  components: { Button },
  setup() { return { args }; },
  template: '<Button v-bind="args" />',
});

export const Example = Template.bind({});
Example.args = {
  label: 'My Button',
};

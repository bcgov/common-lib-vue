import DigitInput from '../../src/components/DigitInput.vue';

export default {
  title: 'Components/DigitInput',
  component: DigitInput,
  argTypes: {},
};

const Template = (args) => ({
  components: { DigitInput, },
  setup(){return{args,}},
  template: '<DigitInput v-bind="args" />',
});

export const Example = Template.bind({});
Example.args = {
  label: 'My Label:',
};

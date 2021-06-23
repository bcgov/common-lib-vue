import PostalCodeInput from '../../src/components/PostalCodeInput.vue';

export default {
  title: 'Components/PostalCodeInput',
  component: PostalCodeInput,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { PostalCodeInput },
  template: '<PostalCodeInput v-bind="$props" />',
});

export const Example = Template.bind({});
Example.args = {
  label: 'My Label:',
};

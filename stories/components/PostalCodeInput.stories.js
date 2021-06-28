import PostalCodeInput from '../../src/components/PostalCodeInput.vue';

export default {
  title: 'Components/PostalCodeInput',
  component: PostalCodeInput,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes).filter((x) => x !== 'value'),
  components: { PostalCodeInput },
  data: () => ({
    value: null,
  }),
  template: '<PostalCodeInput v-bind="$props" v-model="value" />',
});

export const Example = Template.bind({});
Example.args = {
  label: 'My Label:',
};

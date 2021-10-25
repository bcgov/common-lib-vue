import CurrencyInput from '../../src/components/CurrencyInput.vue';

export default {
  title: 'Components/CurrencyInput',
  component: CurrencyInput,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes).filter((x) => x !== 'value'),
  components: { CurrencyInput },
  data: () => ({
    value: null,
  }),
  template: '<CurrencyInput v-bind="$props" v-model="value" />',
});

export const Example = Template.bind({});
Example.args = {
  label: 'My Label:',
  value: 1000.00,
};

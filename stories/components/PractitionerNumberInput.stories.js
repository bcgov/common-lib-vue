import PractitionerNumberInput from '../../src/components/PractitionerNumberInput.vue';

export default {
  title: 'Components/PractitionerNumberInput',
  component: PractitionerNumberInput,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes).filter((x) => x !== 'value'),
  components: { PractitionerNumberInput },
  data: () => ({
    value: null,
  }),
  template: '<PractitionerNumberInput v-bind="$props" v-model="value" />',
});

export const Example = Template.bind({});
Example.args = {
  label: 'My Label:',
};

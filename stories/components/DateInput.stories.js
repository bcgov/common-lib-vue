import DateInput from '../../src/components/DateInput.vue';

export default {
  title: 'Components/DateInput',
  component: DateInput,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { DateInput },
  template: '<DateInput v-bind="$props" />',
});

export const Example = Template.bind({});
Example.args = {
  label: 'Example date:',
};

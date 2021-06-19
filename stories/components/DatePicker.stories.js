import DatePicker from '../../src/components/DatePicker.vue';

export default {
  title: 'Components/DatePicker',
  component: DatePicker,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { DatePicker },
  template: '<DatePicker v-bind="$props" />',
});

export const Example = Template.bind({});

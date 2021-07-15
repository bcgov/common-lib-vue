import TimeInput from '../../src/components/TimeInput.vue';

export default {
  title: 'Components/TimeInput',
  component: TimeInput,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TimeInput },
  template: '<TimeInput v-bind="$props" />',
});

export const Example = Template.bind({});
Example.args = {
  label: 'My Label:'
};

export const TwoDigitHourExample = Template.bind({});
TwoDigitHourExample.args = {
  label: 'My Label:',
  isHourTwoDigits: true,
  value: {
    hour: '01',
    minute: '01'
  }
};

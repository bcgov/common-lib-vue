import FacilityNumberInput from '../../src/components/FacilityNumberInput.vue';

export default {
  title: 'Components/FacilityNumberInput',
  component: FacilityNumberInput,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FacilityNumberInput },
  template: '<FacilityNumberInput v-bind="$props" />',
});

export const Example = Template.bind({});
Example.args = {
  label: 'My Label:',
};

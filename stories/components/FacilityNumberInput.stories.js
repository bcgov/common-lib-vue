import FacilityNumberInput from '../../src/components/FacilityNumberInput.vue';

export default {
  title: 'Components/FacilityNumberInput',
  component: FacilityNumberInput,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes).filter((x) => x !== 'value'),
  components: { FacilityNumberInput },
  data: () => ({
    value: null,
  }),
  template: '<FacilityNumberInput v-bind="$props" v-model="value" />',
});

export const Example = Template.bind({});
Example.args = {
  label: 'My Label:',
};

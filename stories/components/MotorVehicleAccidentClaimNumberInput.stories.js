import MotorVehicleAccidentClaimNumberInput from '../../src/components/MotorVehicleAccidentClaimNumberInput.vue';

export default {
  title: 'Components/MotorVehicleAccidentClaimNumberInput',
  component: MotorVehicleAccidentClaimNumberInput,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes).filter((x) => x !== 'value'),
  components: { MotorVehicleAccidentClaimNumberInput },
  data: () => ({
    value: null,
  }),
  template: '<MotorVehicleAccidentClaimNumberInput v-bind="$props" v-model="value" />',
});

export const Example = Template.bind({});
Example.args = {
  label: 'My Label:',
};

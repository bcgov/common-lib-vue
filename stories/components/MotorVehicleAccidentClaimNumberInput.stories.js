import MotorVehicleAccidentClaimNumberInput from '../../src/components/MotorVehicleAccidentClaimNumberInput.vue';

export default {
  title: 'Components/MotorVehicleAccidentClaimNumberInput',
  component: MotorVehicleAccidentClaimNumberInput,
  argTypes: {},
};

const Template = (args) => ({
  components: { MotorVehicleAccidentClaimNumberInput, },
  data: () => ({
    value: null,
  }),
  setup() { return { args, } },
  template: '<MotorVehicleAccidentClaimNumberInput v-bind="args" v-model="value" />',
});

export const Example = Template.bind({});
Example.args = {
  label: 'My Label:',
};

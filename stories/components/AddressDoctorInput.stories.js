import AddressDoctorInput from '../../src/components/AddressDoctorInput.vue';

export default {
  title: 'Components/AddressDoctorInput',
  component: AddressDoctorInput,
  argTypes: {},
};

const Template = (args, { argTypes, }) => ({
  props: Object.keys(argTypes).filter((x) => x !== 'value'),
  components: { AddressDoctorInput, },
  data: () => ({
    value: null,
  }),
  template: '<AddressDoctorInput v-bind="$props" v-model="value" />',
});

export const Example = Template.bind({});
Example.args = {
  label: 'My Label:',
};

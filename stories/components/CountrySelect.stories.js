import CountrySelect from '../../src/components/CountrySelect.vue';

export default {
  title: 'Components/CountrySelect',
  component: CountrySelect,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CountrySelect },
  template: '<CountrySelect v-bind="$props" />',
});

export const Example = Template.bind({});
Example.args = {
  label: 'My Country:',
  id: 'country',
};

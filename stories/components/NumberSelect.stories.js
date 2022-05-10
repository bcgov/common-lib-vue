import NumberSelect from '../../src/components/NumberSelect.vue';

export default {
  title: 'Components/NumberSelect',
  component: NumberSelect,
  argTypes: {},
};

const Template = (args, { argTypes, }) => ({
  props: Object.keys(argTypes),
  components: { NumberSelect, },
  template: '<NumberSelect v-bind="$props" />',
});

export const Example = Template.bind({});
Example.args = {
  label: 'My Label:',
  min: 1,
  max: 10,
};

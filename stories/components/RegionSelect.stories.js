import RegionSelect from '../../src/components/RegionSelect.vue';

export default {
  title: 'Components/RegionSelect',
  component: RegionSelect,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { RegionSelect },
  template: '<RegionSelect v-bind="$props" />',
});

export const Example = Template.bind({});
Example.args = {
  label: 'My Region:',
  id: 'region',
};

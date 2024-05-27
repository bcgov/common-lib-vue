import RegionSelect from '../../src/components/RegionSelect.vue';

export default {
  title: 'Components/RegionSelect',
  component: RegionSelect,
  argTypes: {},
};

const Template = (args) => ({
  components: { RegionSelect },
  setup() { return { args }; },
  template: '<RegionSelect v-bind="args" />',
});

export const Example = Template.bind({});

const mediumStyles = {
  width: '350px',
  maxWidth: '100%'
};

Example.args = {
  label: 'My Region:',
  id: 'region',
  inputStyle: mediumStyles
};

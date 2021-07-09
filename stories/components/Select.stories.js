import Select from '../../src/components/Select.vue';

export default {
  title: 'Components/Select',
  component: Select,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Select },
  template: '<Select v-bind="$props" />',
});

export const Example = Template.bind({});
Example.args = {
  label: 'My Label:',
  options: [
    {
      value: 'A',
      label: 'Option A'
    },
    {
      value: 'B',
      label: 'Option B'
    },
    {
      value: 'C',
      label: 'Option C'
    }
  ],
};

import Radio from '../../src/components/Radio.vue';

export default {
  title: 'Components/Radio',
  component: Radio,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Radio },
  template: '<Radio v-bind="$props" />',
});

export const Example = Template.bind({});
Example.args = {
  label: 'My Label:',
  items: [
    {
      id: 'yes',
      label: 'Yes',
      value: 'Y'
    },
    {
      id: 'no',
      label: 'No',
      value: 'N'
    }
  ]
};

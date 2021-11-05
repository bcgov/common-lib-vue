import CheckboxGroup from '../../src/components/CheckboxGroup.vue';

export default {
  title: 'Components/CheckboxGroup',
  component: CheckboxGroup,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes).filter((x) => x !== 'value'),
  components: { CheckboxGroup },
  data: () => ({
    value: ['apple'],
  }),
  template: '<CheckboxGroup v-bind="$props" v-model="value" />',
});

export const Example = Template.bind({});
Example.args = {
  id: 'my-checkbox',
  items: [
    {
      id: 'apple',
      value: 'apple',
      label: 'Apple Sauce in a cup'
    },
    {
      id: 'orange',
      value: 'orange',
      label: 'Orange Juice in a jug',
      disabled: true,
    },
    {
      id: 'banana',
      value: 'banana',
      label: 'Banana in a bundle'
    },
  ],
};

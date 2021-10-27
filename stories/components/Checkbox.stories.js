import Checkbox from '../../src/components/Checkbox.vue';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes).filter((x) => x !== 'value'),
  components: { Checkbox },
  data: () => ({
    value: null,
  }),
  template: '<Checkbox v-bind="$props" v-model="value" />',
});

export const Example = Template.bind({});
Example.args = {
  label: 'Toggle me!',
  id: 'checkbox',
};

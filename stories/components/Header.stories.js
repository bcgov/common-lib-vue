import Header from '../../src/components/Header.vue';

export default {
  title: 'Components/Header',
  component: Header,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Header },
  template: '<Header v-bind="$props" />',
});

export const Example = Template.bind({});
Example.args = {
  title: 'My Application Title',
  imagePath: '/images/'
};

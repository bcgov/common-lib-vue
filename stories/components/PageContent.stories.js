import PageContent from '../../src/components/PageContent.vue';

export default {
  title: 'Components/PageContent',
  component: PageContent,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { PageContent },
  template: '<PageContent v-bind="$props" />',
});

export const Example = Template.bind({});

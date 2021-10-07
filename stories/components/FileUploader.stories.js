import FileUploader from '../../src/components/FileUploader.vue';

export default {
  title: 'Components/FileUploader',
  component: FileUploader,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FileUploader },
  template: '<FileUploader v-bind="$props" />',
});

export const Example = Template.bind({});

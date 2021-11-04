import FileUploader from '../../src/components/FileUploader.vue';

export default {
  title: 'Components/FileUploader',
  component: FileUploader,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes).filter((x) => x !== 'value'),
  components: { FileUploader },
  data: () => ({
    files: [],
  }),
  template: '<FileUploader v-bind="$props" v-model="files" />',
});

export const Example = Template.bind({});

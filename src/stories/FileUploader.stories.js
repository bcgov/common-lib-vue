import FileUploader from "../../src/components/FileUploader.vue";

export default {
  title: "Components/FileUploader",
  component: FileUploader,
  argTypes: {},
};

const Template = (args) => ({
  components: {
    FileUploader,
  },
  data: () => ({
    files: [],
  }),
  setup() {
    return { args };
  },
  template: `
  <div>
    <FileUploader v-bind="args" v-model="files" />
    <div id="modal-target"></div>
  </div>`,
});

export const Example = Template.bind({});

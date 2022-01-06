import FileUploader from '../../src/components/FileUploader.vue';
import { PortalTarget } from 'portal-vue';

export default {
  title: 'Components/FileUploader',
  component: FileUploader,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes).filter((x) => x !== 'value'),
  components: {
    FileUploader,
    PortalTarget,
  },
  data: () => ({
    files: [],
  }),
  template: `
  <div>
    <FileUploader v-bind="$props" v-model="files" />
    <div id="modal-target"></div>
  </div>`,
});

export const Example = Template.bind({});

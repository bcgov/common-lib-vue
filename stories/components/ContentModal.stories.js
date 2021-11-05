import Button from '../../src/components/Button.vue';
import ContentModal from '../../src/components/ContentModal.vue';

export default {
  title: 'Components/ContentModal',
  component: ContentModal,
  argTypes: {},
};

const content = `
  <p>Hello World!</p>
  <p>This is a link to Google: <a href="https://google.ca" target="_blank">click here</a></p>
  <p>Filler content.</p>
  <p>Filler content.</p>
  <p>Filler content.</p>
  <p>Filler content.</p>
  <p>Filler content.</p>
  <p>Filler content.</p>
  <p>Filler content.</p>
  <p>Filler content.</p>
  <p>Filler content.</p>
  <p>Filler content.</p>
  <p>Filler content.</p>
  <p>Filler content.</p>
  <p>Filler content.</p>
  <p>Filler content.</p>
  <p>Filler content.</p>
`;

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    ContentModal,
    Button,
  },
  data: () => ({
    isModalShown: false,
  }),
  methods: {
    handleClickOpenModal() {
      this.isModalShown = true;
    },
    handleClose() {
      this.isModalShown = false;
    }
  },
  template: `
    <div>
      <Button label="Open Modal" @click="handleClickOpenModal()" />
      <ContentModal v-if="isModalShown"
        v-bind="$props"
        @close="handleClose()">
        ${content}
      </ContentModal>
    </div>
  `,
});

const ImageTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    ContentModal,
    Button,
  },
  data: () => ({
    isModalShown: false,
  }),
  methods: {
    handleClickOpenModal() {
      this.isModalShown = true;
    },
    handleClose() {
      this.isModalShown = false;
    }
  },
  template: `
    <div>
      <Button label="Open Modal" @click="handleClickOpenModal()" />
      <ContentModal v-if="isModalShown"
        v-bind="$props"
        @close="handleClose()">
        <img src="/canadian-cit-card-sample.jpg" style="max-width: 100%"/>
      </ContentModal>
    </div>
  `,
});

export const Example = Template.bind({});
Example.args = {
  title: 'Modal Title Here',
};

export const ImageExample = ImageTemplate.bind({});
ImageExample.args = {
  title: 'Modal Title Here',
};

import ButtonComponent from "../../src/components/ButtonComponent.vue";
import ContentModal from "../../src/components/ContentModal.vue";

export default {
  title: "Components/ContentModal",
  component: ContentModal,
  argTypes: {},
};

const Template = (args) => ({
  components: {
    ContentModal,
    ButtonComponent,
  },
  data: () => ({
    isModalShown: false,
    count: 0,
    isCountRendered: true,
  }),
  setup() {
    return { args };
  },
  created() {
    setInterval(() => {
      // Used to trigger a DOM change manually.
      this.isCountRendered = false;
      this.count++;
      setTimeout(() => {
        this.isCountRendered = true;
      }, 0);
    }, 5000);
  },
  methods: {
    handleClickOpenModal() {
      this.isModalShown = true;
    },
    handleClose() {
      this.isModalShown = false;
    },
  },
  template: `
    <div>
      <ButtonComponent label="Open Modal" @click="handleClickOpenModal()" />
      <ContentModal v-if="isModalShown"
        v-bind="args"
        @close="handleClose()">
        <p>Hello World!</p>
        <p>This is a link to Google: <a href="https://google.ca" target="_blank">click here</a></p>
        <p v-if="isCountRendered">Count: <a href="javascript:void(0)">{{count}}</a></p>
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
      </ContentModal>
    </div>
  `,
});

const ImageTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    ContentModal,
    ButtonComponent,
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
    },
  },
  template: `
    <div>
      <ButtonComponent label="Open Modal" @click="handleClickOpenModal()" />
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
  title: "Modal Title Here",
};

export const ImageExample = ImageTemplate.bind({});
ImageExample.args = {
  title: "Modal Title Here",
};

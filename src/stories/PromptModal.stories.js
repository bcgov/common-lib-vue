import PromptModal from "../../src/components/PromptModal.vue";

export default {
  title: "Components/PromptModal",
  component: PromptModal,
  argTypes: {},
};

const Template = (args) => ({
  components: { PromptModal },
  setup() {
    return { args };
  },
  template: '<PromptModal v-bind="args" />',
});

export const Example = Template.bind({});
Example.args = {
  title: "My Title:",
};

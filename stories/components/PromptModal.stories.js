import PromptModal from '../../src/components/PromptModal.vue';

export default {
  title: 'Components/PromptModal',
  component: PromptModal,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { PromptModal },
  template: '<PromptModal v-bind="$props" />',
});

export const Example = Template.bind({});
Example.args = {
  title: 'My Title:',
};

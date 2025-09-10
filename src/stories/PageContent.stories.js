import PageContent from "../../src/components/PageContent.vue";

export default {
  title: "Components/PageContent",
  component: PageContent,
  argTypes: {},
};

const Template = (args) => ({
  components: { PageContent },
  setup() {
    return { args };
  },
  template: '<PageContent v-bind="args" />',
});

export const Example = Template.bind({});

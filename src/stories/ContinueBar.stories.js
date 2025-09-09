import ContinueBar from "../../src/components/ContinueBar.vue";

export default {
  title: "Components/ContinueBar",
  component: ContinueBar,
  argTypes: {},
};

const Template = (args) => ({
  setup() {
    return { args };
  },
  components: { ContinueBar },
  template:
    '<div><p>page content here (scroll down to find continue bar + test sticky behavior)</p><br><br><br><p>||</p><br><br><br><p>||</p><br><br><br><br><p>||</p><br><br><br><p>||</p><br><br><br><p>||</p><br><br><p>end page content</p><ContinueBar v-bind="args" /></div>',
});

export const Example = Template.bind({});

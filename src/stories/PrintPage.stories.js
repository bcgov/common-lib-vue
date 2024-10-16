import PrintPage from "../../src/components/PrintPage.vue";

export default {
  title: "Components/PrintPage",
  component: PrintPage,
  argTypes: {},
};

//this template has an inline style so the tip box doesn't cut off in storybook
const Template = (args) => ({
  components: { PrintPage },
  setup() {
    return { args };
  },
  template: `<div style="display: flex; justify-content: flex-end">
      <PrintPage v-bind="args"/>
    </div>`,
});

const UnjustifiedTemplate = (args) => ({
  components: { PrintPage },
  setup() {
    return { args };
  },
  template: `<div>
    <PrintPage v-bind="args"/>
  </div>`,
});

export const Example = Template.bind({});
Example.args = {
  // label: "My Label:",
};

export const UnjustifiedExample = UnjustifiedTemplate.bind({});
Example.args = {
  // label: "My Label:",
};

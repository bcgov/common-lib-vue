import Captcha from "../components/CaptchaComponent.vue";

export default {
  title: "Components/Captcha",
  component: Captcha,
  argTypes: {},
};

const Template = (args) => ({
  components: { Captcha },
  setup() {
    return { args };
  },
  template: '<Captcha v-bind="$props" />',
});

export const Example = Template.bind({});
Example.args = {
  apiBasePath: "/project/api/captcha",
  nonce: "0123456789",
};

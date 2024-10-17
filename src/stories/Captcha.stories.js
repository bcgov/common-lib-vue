import CaptchaComponent from "../components/CaptchaComponent.vue";
import mockCaptcha from "./assets/mockCaptcha.js";
import mockCaptchaAudio from "./assets/mockCaptchaAudio.js";

const apiBasePath = "/project/api/captcha";

export default {
  title: "Components/CaptchaComponent",
  component: CaptchaComponent,
  argTypes: {},
};

const Template = (args) => ({
  components: { CaptchaComponent },
  setup() {
    return { args };
  },
  template: `<CaptchaComponent v-bind="args"/>`,
});

export const Example = Template.bind({});
Example.args = {
  apiBasePath,
  nonce: "0123456789",
};
Example.parameters = {
  mockData: [
    {
      url: `${apiBasePath}/captcha`,
      method: "POST",
      status: 200,
      response: {
        nonce: "c59c9512-5444-4424-9efe-767a83165da5",
        captcha: mockCaptcha,
      },
    },
    {
      url: `${apiBasePath}/captcha/audio`,
      method: "POST",
      status: 200,
      response: mockCaptchaAudio,
    },
  ],
};

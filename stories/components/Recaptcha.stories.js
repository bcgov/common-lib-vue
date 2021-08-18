import Recaptcha from '../../src/components/Recaptcha.vue';

export default {
  title: 'Components/Recaptcha',
  component: Recaptcha,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Captcha },
  template: '<Captcha v-bind="$props" />',
});

export const Example = Template.bind({});
Example.args = {
  apiBasePath: '/project/api/recaptcha',
  nonce: '0123456789',
  publicKey="6LfHcJcbAAAAAJA_kkeR4AXt92hSUpCxb-mKeWkT"
};

import Captcha from '../../src/components/Captcha.vue';

export default {
  title: 'Components/Captcha',
  component: Captcha,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Captcha },
  template: '<Captcha v-bind="$props" />',
});

export const Example = Template.bind({});
Example.args = {
  apiBasePath: '/project/api/captcha',
  nonce: '0123456789'
};
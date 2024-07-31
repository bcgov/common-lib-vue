import Footer from '../../src/components/Footer.vue'

export default {
  title: 'Components/Footer',
  component: Footer,
  argTypes: {}
}

const Template = (args) => ({
  setup() {
    return { args }
  },
  components: { Footer },
  template: '<Footer v-bind="args" />'
})

export const Example = Template.bind({})
Example.args = {
  version: '1.0.0'
}

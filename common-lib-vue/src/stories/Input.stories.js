import Input from '../../src/components/Input.vue'

export default {
  title: 'Components/Input',
  component: Input,
  argTypes: {}
}

const Template = (args) => ({
  components: { Input },
  setup() {
    return { args }
  },
  template: '<Input v-bind="args" />'
})

export const Example = Template.bind({})
Example.args = {
  label: 'My Label:'
}

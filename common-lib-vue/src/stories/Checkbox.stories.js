import Checkbox from '../../src/components/Checkbox.vue'

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {}
}

const Template = (args) => ({
  components: { Checkbox },
  setup() {
    return { args }
  },
  data: () => ({
    value: null
  }),
  template: '<Checkbox v-bind="args" v-model="value" />'
})

export const Example = Template.bind({})
Example.args = {
  label: 'Toggle me!',
  id: 'checkbox'
}

import PhnInput from '../../src/components/PhnInput.vue'

export default {
  title: 'Components/PhnInput',
  component: PhnInput,
  argTypes: {}
}

const Template = (args) => ({
  components: { PhnInput },
  setup() {
    return { args }
  },
  template: '<PhnInput v-bind="args" />'
})

export const Example = Template.bind({})
Example.args = {
  label: 'My Label:'
}

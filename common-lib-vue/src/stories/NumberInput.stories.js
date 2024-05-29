import NumberInput from '../../src/components/NumberInput.vue'

export default {
  title: 'Components/NumberInput',
  component: NumberInput,
  argTypes: {}
}

const Template = (args) => ({
  components: { NumberInput },
  setup() {
    return { args }
  },
  template: '<NumberInput v-bind="args" />'
})

export const Example = Template.bind({})
Example.args = {
  label: 'My Label:'
}

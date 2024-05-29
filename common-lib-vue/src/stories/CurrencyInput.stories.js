import CurrencyInput from '../../src/components/CurrencyInput.vue'

export default {
  title: 'Components/CurrencyInput',
  component: CurrencyInput,
  argTypes: {}
}

const Template = (args) => ({
  setup() {
    return { args }
  },
  components: { CurrencyInput },
  data: () => ({
    value: null
  }),
  template: '<CurrencyInput v-bind="args" v-model="value" />'
})

export const Example = Template.bind({})
Example.args = {
  label: 'My Label:',
  value: 1000.0
}

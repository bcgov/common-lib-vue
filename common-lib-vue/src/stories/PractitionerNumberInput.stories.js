import PractitionerNumberInput from '../../src/components/PractitionerNumberInput.vue'

export default {
  title: 'Components/PractitionerNumberInput',
  component: PractitionerNumberInput,
  argTypes: {}
}

const Template = (args) => ({
  components: { PractitionerNumberInput },
  setup() {
    return { args }
  },
  template: '<PractitionerNumberInput v-bind="args" />'
})

export const Example = Template.bind({})
Example.args = {
  label: 'My Label:'
}

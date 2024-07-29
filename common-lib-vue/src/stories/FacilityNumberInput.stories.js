import FacilityNumberInput from '../../src/components/FacilityNumberInput.vue'

export default {
  title: 'Components/FacilityNumberInput',
  component: FacilityNumberInput,
  argTypes: {}
}

const Template = (args) => ({
  components: { FacilityNumberInput },
  setup() {
    return { args }
  },
  data: () => ({
    value: null
  }),
  template: '<FacilityNumberInput v-bind="args" v-model="value" />'
})

export const Example = Template.bind({})
Example.args = {
  label: 'My Label:'
}

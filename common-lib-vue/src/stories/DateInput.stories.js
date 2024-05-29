import DateInput from '../../src/components/DateInput.vue'

export default {
  title: 'Components/DateInput',
  component: DateInput,
  argTypes: {}
}

const Template = (args) => ({
  components: { DateInput },
  setup() {
    return { args }
  },
  date() {
    return {
      selected: null
    }
  },
  template: '<DateInput v-bind="args" v-model="selected" />'
})

export const Example = Template.bind({})
Example.args = {
  label: 'Example date:'
}

import ButtonComponent from '../../src/components/ButtonComponent.vue'

export default {
  title: 'Components/Button',
  component: ButtonComponent,
  argTypes: {
    color: {
      options: ['blue', 'white', 'gold'],
      control: { type: 'select' }
    }
  }
}

const Template = (args) => ({
  components: { ButtonComponent },
  setup() {
    return { args }
  },
  template: '<ButtonComponent v-bind="args" />'
})

export const Example = Template.bind({})
Example.args = {
  label: 'My Button'
}

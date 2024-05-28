import Header from '../../src/components/Header.vue'

export default {
  title: 'Components/Header',
  component: Header,
  argTypes: {}
}

const Template = (args) => ({
  components: { Header },
  setup() {
    return { args }
  },
  template: '<Header v-bind="args" />'
})

export const Example = Template.bind({})
Example.args = {
  title: 'My Application Title',
  imagePath: 'src/stories/assets/'
}

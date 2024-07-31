/** @type { import('@storybook/vue3').Preview } */
import '@/styles/styles.css'
import '@bcgov/bootstrap-v5-theme/css/bootstrap-theme.min.css'

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
}

export default preview

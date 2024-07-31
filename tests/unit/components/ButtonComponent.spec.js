import { mount } from '@vue/test-utils'
import Component from '@/components/ButtonComponent.vue'
import { it, describe, expect, beforeEach } from 'vitest'

describe('ButtonComponent.vue', () => {
  let wrapper
  beforeEach(() => {})
  it('renders', () => {
    wrapper = mount(Component, {
      props: {
        label: 'My Button'
      }
    })
    expect(wrapper.element).toBeDefined()
  })

  it('contains cypress Value', () => {
    wrapper = mount(Component, {
      props: {
        label: 'My Button',
        cypressId: 'potato'
      }
    })
    expect(wrapper.find('[data-cy=potato]').exists()).toBe(true)
  })

  it('emits click event', async () => {
    wrapper = mount(Component, {
      props: {
        label: 'My Button'
      }
    })
    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted().click.length).toBe(1)
  })
})

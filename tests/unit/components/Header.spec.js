import { mount } from '@vue/test-utils'
import Component from '@/components/HeaderComponent.vue'
import { it, describe, expect } from 'vitest'

describe('HeaderComponent.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component, {
      props: {
        title: 'My Application Title'
      }
    })
    expect(wrapper.element).toBeDefined()
  })
})

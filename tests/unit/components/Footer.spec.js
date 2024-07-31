import { mount } from '@vue/test-utils'
import Component from '@/components/Footer.vue'
import { it, describe, expect } from 'vitest'

describe('Footer.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component)
    expect(wrapper.element).toBeDefined()
  })
})

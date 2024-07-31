import { mount } from '@vue/test-utils'
import Component from '@/components/Loader.vue'
import { it, describe, expect } from 'vitest'

describe('Loader.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component)
    expect(wrapper.element).toBeDefined()
  })
})

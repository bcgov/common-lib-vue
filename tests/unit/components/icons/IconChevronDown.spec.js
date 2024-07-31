import { mount } from '@vue/test-utils'
import Component from '@/components/icons/IconChevronDown.vue'
import { it, describe, expect } from 'vitest'

describe('IconChevronDown.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component)
    expect(wrapper.element).toBeDefined()
  })
})

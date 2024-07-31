import { mount } from '@vue/test-utils'
import Component from '@/components/icons/IconChevronDoubleLeft.vue'
import { it, describe, expect } from 'vitest'

describe('IconChevronDoubleLeft.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component)
    expect(wrapper.element).toBeDefined()
  })
})

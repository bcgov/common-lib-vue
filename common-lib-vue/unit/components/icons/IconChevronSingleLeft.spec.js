import { mount } from '@vue/test-utils'
import Component from '@/components/icons/IconChevronSingleLeft.vue'
import { it, describe, expect } from 'vitest'

describe('IconChevronSingleLeft.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component)
    expect(wrapper.element).toBeDefined()
  })
})

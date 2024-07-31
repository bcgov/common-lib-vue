import { mount } from '@vue/test-utils'
import Component from '@/components/icons/IconCalendar.vue'
import { it, describe, expect } from 'vitest'

describe('IconCalendar.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component)
    expect(wrapper.element).toBeDefined()
  })
})

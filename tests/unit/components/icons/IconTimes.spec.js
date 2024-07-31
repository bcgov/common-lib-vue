import { mount } from '@vue/test-utils'
import Component from '@/components/icons/IconTimes.vue'
import { it, describe, expect } from 'vitest'

describe('IconTimes.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component)
    expect(wrapper.element).toBeDefined()
  })
})

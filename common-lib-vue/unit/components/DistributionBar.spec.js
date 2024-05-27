import { mount } from '@vue/test-utils'
import Component from '@/components/DistributionBar.vue'
import { it, describe, expect } from 'vitest'

describe('DistributionBar.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component)
    expect(wrapper.element).toBeDefined()
  })
})

import { mount } from '@vue/test-utils'
import Component from '@/components/LoaderComponent.vue'
import { it, describe, expect } from 'vitest'

describe('LoaderComponent.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component)
    expect(wrapper.element).toBeDefined()
  })
})

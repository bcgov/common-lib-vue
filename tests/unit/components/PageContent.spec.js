import { mount } from '@vue/test-utils'
import Component from '@/components/PageContent.vue'
import { it, describe, expect } from 'vitest'

describe('PageContent.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component)
    expect(wrapper.element).toBeDefined()
  })
})

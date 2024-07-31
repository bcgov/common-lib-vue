import { mount } from '@vue/test-utils'
import Component from '@/components/icons/IconCloudUpload.vue'
import { it, describe, expect } from 'vitest'

describe('IconCloudUpload.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component)
    expect(wrapper.element).toBeDefined()
  })
})

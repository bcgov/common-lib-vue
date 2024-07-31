import { mount } from '@vue/test-utils'
import Component from '@/components/Header.vue'
import { it, describe, expect } from 'vitest'

describe('Header.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component, {
      props: {
        title: 'My Application Title'
      }
    })
    expect(wrapper.element).toBeDefined()
  })
})

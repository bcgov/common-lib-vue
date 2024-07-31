import { mount } from '@vue/test-utils'
import Component from '@/components/ContentModal.vue'
import { it, describe, expect, vi } from 'vitest'

describe('ContentModal.vue', () => {
  let wrapper

  it('renders', () => {
    wrapper = mount(Component, {
      props: {
        title: 'My Modal'
      }
    })
    expect(wrapper.element).toBeDefined()
  })

  it('getFocusableEls returns array of elements', () => {
    wrapper = mount(Component, {
      props: {
        title: 'My Modal'
      },
      slots: {
        default: '<a href="javascript:void(0)">Hello</a>'
      }
    })
    const focusableEls = wrapper.vm.getFocusableEls()
    expect(Array.isArray(focusableEls)).toBe(true)
    expect(focusableEls.length).toBe(2)
  })

  it('getFocusableEls returns empty array when no focusable elements exist', () => {
    wrapper = mount(Component, {
      props: {
        title: 'My Modal',
        isCloseButtonShown: false
      }
    })
    const focusableEls = wrapper.vm.getFocusableEls()
    expect(Array.isArray(focusableEls)).toBe(true)
    expect(focusableEls.length).toBe(0)
  })

  it('should emit "close" event when clicking close icon', async () => {
    wrapper = mount(Component, {
      props: {
        title: 'My Modal'
      }
    })
    await wrapper.find('button.close').trigger('click')
    expect(wrapper.emitted().close.length).toBe(1)
  })

  it('should emit "close" event when clicking background', async () => {
    wrapper = mount(Component, {
      props: {
        title: 'My Modal'
      }
    })
    await wrapper.find('.modal').trigger('click')
    expect(wrapper.emitted().close.length).toBe(1)
  })

  it('should not emit "close" event when clicking background and "closeOnBackgroundClick" prop is false', async () => {
    wrapper = mount(Component, {
      props: {
        title: 'My Modal',
        closeOnBackgroundClick: false
      }
    })
    await wrapper.find('.modal').trigger('click')
    expect(wrapper.emitted().close).not.toBeDefined()
  })

  it('should handle tab keydown events', async () => {
    const handleTabSpy = vi.spyOn(Component.methods, 'handleTab')
    const keyboardEvent = new KeyboardEvent('keydown', {
      key: 'Tab'
    })
    wrapper = mount(Component, {
      props: {
        title: 'My Modal'
      }
    })
    expect(wrapper.vm.focusedEl).toBeFalsy()
    await wrapper.vm.handleKeyDown(keyboardEvent)
    expect(handleTabSpy).toBeCalled()
    expect(wrapper.vm.focusedEl).toBeTruthy()
  })

  it('should handle shift-tab keydown events', async () => {
    const handleTabBackwardsSpy = vi.spyOn(Component.methods, 'handleTabBackwards')
    const keyboardEvent = new KeyboardEvent('keydown', {
      key: 'Tab',
      shiftKey: true
    })
    wrapper = mount(Component, {
      props: {
        title: 'My Modal'
      }
    })
    expect(wrapper.vm.focusedEl).toBeFalsy()
    await wrapper.vm.handleKeyDown(keyboardEvent)
    expect(handleTabBackwardsSpy).toBeCalled()
    expect(wrapper.vm.focusedEl).toBeTruthy()
  })
})

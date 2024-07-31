import { mount } from '@vue/test-utils'
import CheckboxGroup from '@/components/CheckboxGroup.vue'
import { it, describe, expect } from 'vitest'

const items = [
  {
    label: 'Item A',
    value: 'A',
    id: 'a'
  },
  {
    label: 'Item B',
    value: 'B',
    id: 'b'
  },
  {
    label: 'Item C',
    value: 'C',
    id: 'c'
  }
]

describe('CheckboxGroup.vue', () => {
  let wrapper

  it('renders', () => {
    wrapper = mount(CheckboxGroup)
    expect(wrapper.element).toBeDefined()
  })

  it('emits "input" event with array of selected values when changing checkbox value', async () => {
    wrapper = mount(CheckboxGroup, {
      props: {
        label: 'Toggle me!',
        id: 'checkbox',
        items
      }
    })
    await wrapper.find('#checkbox-a').setChecked()
    const inputEvents = wrapper.emitted().input
    expect(inputEvents.length).toBe(1)
    expect(inputEvents[0][0]).toEqual(['A'])

    await wrapper.find('#checkbox-b').setChecked()
    expect(inputEvents[1][0]).toEqual(['A', 'B'])

    await wrapper.find('#checkbox-a').setChecked(false)
    expect(inputEvents[2][0]).toEqual(['B'])
  })

  it('does not emit "input" event when clicking disabled checkbox', async () => {
    const itemsWithDisabled = [...items]
    itemsWithDisabled[0] = {
      label: 'Item A',
      value: 'A',
      id: 'a',
      disabled: true
    }
    wrapper = mount(CheckboxGroup, {
      props: {
        label: 'Toggle me!',
        items: itemsWithDisabled
      }
    })
    await wrapper.find('input[type=checkbox]').setChecked()
    expect(wrapper.emitted().input).not.toBeDefined()
  })
})

describe('Checkbox event handling', () => {
  it('works correctly with v-model', async () => {
    const wrapper = mount({
      data() {
        return {
          items,
          selected: ['A']
        }
      },
      template: '<div><CheckboxGroup v-model="selected" :items="items" id="checkbox" /></div>',
      components: { CheckboxGroup }
    })

    const checkboxA = wrapper.find('#checkbox-a')
    const checkboxB = wrapper.find('#checkbox-b')
    const checkboxC = wrapper.find('#checkbox-c')

    // Only item from 'selected' array is checked initially
    expect(checkboxA.element.checked).toBe(true)
    expect(checkboxB.element.checked).toBe(false)
    expect(checkboxC.element.checked).toBe(false)

    await checkboxA.setChecked(false)
    await checkboxB.setChecked(true)
    await checkboxC.setChecked(true)
    expect(wrapper.vm.selected).toEqual(['B', 'C'])
  })
})

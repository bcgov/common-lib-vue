import { mount } from '@vue/test-utils'
import CountrySelect from '@/components/CountrySelect.vue'
import { it, describe, expect } from 'vitest'

describe('CountrySelect.vue', () => {
  it('renders', () => {
    const wrapper = mount(CountrySelect)
    expect(wrapper.element).toBeDefined()
  })

  it('should emit "input" event when changing value of select dropdown', async () => {
    const wrapper = mount(CountrySelect)
    await wrapper.find('select').trigger('change', {
      value: 'Canada'
    })
    expect(wrapper.emitted()['update:modelValue'].length).toBe(1)
  })

  it('should emit "blur" event when losing focus of the select dropdown', async () => {
    const wrapper = mount(CountrySelect)
    await wrapper.find('select').trigger('blur')
    expect(wrapper.emitted().blur.length).toBe(1)
  })
})

describe('CountrySelect event handling', () => {
  it('works correctly with v-model', async () => {
    const wrapper = mount({
      data() {
        return { country: null }
      },
      template: '<div><CountrySelect v-model="country" /></div>',
      components: { CountrySelect }
    })

    expect(wrapper.vm.country).toBe(null)
    // Wait a cycle for options to populate
    wrapper.vm.$nextTick(async () => {
      // Select third option (placeholder is first)
      await wrapper.findAll('option').at(1).setSelected()
      expect(wrapper.vm.country).toBe('Canada')
    })
  })
})

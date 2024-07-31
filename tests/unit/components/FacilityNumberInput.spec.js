import { mount } from '@vue/test-utils'
import FacilityNumberInput from '@/components/FacilityNumberInput.vue'
import { it, describe, expect } from 'vitest'

describe('FacilityNumberInput.vue', () => {
  it('renders', () => {
    const wrapper = mount(FacilityNumberInput)
    expect(wrapper.element).toBeDefined()
  })

  it('emits input event with upper case string', async () => {
    const wrapper = mount(FacilityNumberInput)

    const baseInput = wrapper.find('input')
    await baseInput.setValue('a1a1a')

    expect(wrapper.emitted().input).toBeTruthy()
    expect(wrapper.emitted().input).toEqual([['A1A1A']])
  })

  it('works correctly with v-model', async () => {
    const wrapper = mount({
      data() {
        return { facilityNumber: '' }
      },
      template: '<div><FacilityNumberInput v-model="facilityNumber" /></div>',
      components: { FacilityNumberInput }
    })

    expect(wrapper.vm.facilityNumber).toBe('')
    const baseInput = wrapper.find('input')
    await baseInput.setValue('a12s1')

    // Mask adds spaces
    expect(wrapper.vm.facilityNumber).toBe('A12S1')
  })
})

describe('FacilityNumberInput getCypressValue()', () => {
  it('contains cypress Value', () => {
    const wrapper = mount(FacilityNumberInput, {
      props: {
        cypressId: 'potato'
      }
    })
    expect(wrapper.find('[data-cy=potato]').exists()).toBe(true)
  })
})

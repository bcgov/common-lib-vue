import { mount } from '@vue/test-utils'
import MotorVehicleAccidentClaimNumberInput, {
  motorVehicleAccidentClaimNumberValidator
} from '@/components/MotorVehicleAccidentClaimNumberInput.vue'
import { it, describe, expect } from 'vitest'

describe('MotorVehicleAccidentClaimNumberInput.spec.vue', () => {
  it('renders', () => {
    const wrapper = mount(MotorVehicleAccidentClaimNumberInput)
    expect(wrapper.element).toBeDefined()
  })

  it('emits input event with upper case string', async () => {
    const wrapper = mount(MotorVehicleAccidentClaimNumberInput)
    const Input = wrapper.find('input')
    await Input.setValue('lu123456')

    expect(wrapper.emitted().input).toBeTruthy()
    expect(wrapper.emitted().input).toEqual([['LU123456']])
  })

  it('validator return correct value', () => {
    expect(motorVehicleAccidentClaimNumberValidator('LU005213')).toBe(true)
    expect(motorVehicleAccidentClaimNumberValidator('L1005213')).toBe(true)
    expect(motorVehicleAccidentClaimNumberValidator('L1005214')).toBe(false)
    expect(motorVehicleAccidentClaimNumberValidator('L100521')).toBe(false)
    expect(motorVehicleAccidentClaimNumberValidator('L10052134')).toBe(false)
    expect(motorVehicleAccidentClaimNumberValidator(undefined)).toBe(false)
    expect(motorVehicleAccidentClaimNumberValidator(null)).toBe(false)
    expect(motorVehicleAccidentClaimNumberValidator(NaN)).toBe(false)
  })

  it('works correctly with v-model', async () => {
    const wrapper = mount({
      data() {
        return {
          val: 'a'
        }
      },
      template: '<div><MotorVehicleAccidentClaimNumberInput v-model="val" /></div>',
      components: { MotorVehicleAccidentClaimNumberInput }
    })
    const input = wrapper.find('input')
    expect(input.element.value).toBe('a')

    input.setValue('la234567')
    expect(wrapper.vm.val).toBe('LA234567')
  })
})

describe('MovorVehicleAccident getCypressValue()', () => {
  it('contains cypress Value', () => {
    const wrapper = mount(MotorVehicleAccidentClaimNumberInput, {
      props: {
        cypressId: 'potato'
      }
    })
    expect(wrapper.find('[data-cy=potato]').exists()).toBe(true)
  })
})

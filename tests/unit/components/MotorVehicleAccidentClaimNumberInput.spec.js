import {
  mount,
  createLocalVue
} from '@vue/test-utils';
import Component, {
  motorVehicleAccidentClaimNumberValidator,
} from '../../../src/components/MotorVehicleAccidentClaimNumberInput.vue';

const localVue = createLocalVue();

describe('MotorVehicleAccidentClaimNumberInput.spec.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component, {
      localVue,
    });
    expect(wrapper.element).toBeDefined();
  });

  it('emits input event with upper case string', () => {
    const wrapper = mount(Component, {
      localVue,
    });
    wrapper.vm.inputHandler('lu123456');
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input).toEqual([['LU123456']]);
  });

  it('validator return correct value', () => {
    expect(motorVehicleAccidentClaimNumberValidator('LU005213')).toBe(true);
    expect(motorVehicleAccidentClaimNumberValidator('L1005213')).toBe(true);
    expect(motorVehicleAccidentClaimNumberValidator('L1005214')).toBe(false);
    expect(motorVehicleAccidentClaimNumberValidator('L100521')).toBe(false);
    expect(motorVehicleAccidentClaimNumberValidator('L10052134')).toBe(false);
    expect(motorVehicleAccidentClaimNumberValidator(undefined)).toBe(false);
    expect(motorVehicleAccidentClaimNumberValidator(null)).toBe(false);
    expect(motorVehicleAccidentClaimNumberValidator(NaN)).toBe(false);
  });
});

describe('MovorVehicleAccident getCypressValue()', () => {
  it('contains cypress Value', () => {
    const wrapper = mount(Component, {
      localVue,
      propsData: {
        cypressId: 'potato'
      }
    });
    expect(wrapper.find("[data-cy=potato]").exists()).toBe(true)
  });
});
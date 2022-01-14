import {
  mount,
  createLocalVue
} from '@vue/test-utils';
import Component from '../../../src/components/CurrencyInput.vue';

const localVue = createLocalVue();

describe('CurrencyInput.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component, {
      localVue,
    });
    expect(wrapper.element).toBeDefined();
  });

  it('removeLeadingZeros() removes leading zeros', () => {
    const wrapper = mount(Component, {
      localVue,
    });
    expect(wrapper.vm.removeLeadingZeros('0')).toBe('0');
    expect(wrapper.vm.removeLeadingZeros('00')).toBe('0');
    expect(wrapper.vm.removeLeadingZeros('000')).toBe('0');
    expect(wrapper.vm.removeLeadingZeros('1')).toBe('1');
    expect(wrapper.vm.removeLeadingZeros('1234')).toBe('1234');
    //expect(wrapper.vm.removeLeadingZeros('01234')).toBe('1234');
    //expect(wrapper.vm.removeLeadingZeros('001234')).toBe('1234');
    //expect(wrapper.vm.removeLeadingZeros('0001234')).toBe('1234');
    expect(wrapper.vm.removeLeadingZeros('0.12')).toBe('0.12');
    expect(wrapper.vm.removeLeadingZeros('00.12')).toBe('0.12');
    expect(wrapper.vm.removeLeadingZeros('000.12')).toBe('0.12');
    expect(wrapper.vm.removeLeadingZeros('-000.12')).toBe('-0.12');
    expect(wrapper.vm.removeLeadingZeros('')).toBe('');
    expect(wrapper.vm.removeLeadingZeros(undefined)).toBe(undefined);
    expect(wrapper.vm.removeLeadingZeros(null)).toBe(null);
    expect(wrapper.vm.removeLeadingZeros(NaN)).toBe(NaN);
  });
});

describe('NumberInput getCypressValue()', () => {
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

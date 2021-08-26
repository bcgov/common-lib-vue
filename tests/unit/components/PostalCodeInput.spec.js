import {
  mount,
  createLocalVue
} from '@vue/test-utils';
import Component from '../../../src/components/PostalCodeInput.vue';

const localVue = createLocalVue();

describe('PostalCodeInput.vue', () => {
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
    wrapper.vm.inputHandler('v8v 8v8');
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input).toEqual([['V8V 8V8']]);
  });
});

describe('cyValue()', () => {
  it('contains cyValue', () => {
    const wrapper = mount(Component, {
      localVue,
      propsData: {
        cypressId: 'potato'
      }
    });
    expect(wrapper.find("[data-cy=potato]").exists()).toBe(true)
  });
});

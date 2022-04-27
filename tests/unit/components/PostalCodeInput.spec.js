import { mount } from '@vue/test-utils';
import Component from '../../../src/components/PostalCodeInput.vue';

describe('PostalCodeInput.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component);
    expect(wrapper.element).toBeDefined();
  });

  it('emits input event with upper case string', () => {
    const wrapper = mount(Component);
    wrapper.vm.inputHandler('v8v 8v8');
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input).toEqual([['V8V 8V8']]);
  });
});

describe('PostalCodeInput getCypressValue()', () => {
  it('contains cypress Value', () => {
    const wrapper = mount(Component, {
      props: {
        cypressId: 'potato'
      }
    });
    expect(wrapper.find("[data-cy=potato]").exists()).toBe(true)
  });
});

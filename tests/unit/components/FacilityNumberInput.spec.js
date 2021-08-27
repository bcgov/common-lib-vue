import {
  mount,
  createLocalVue
} from '@vue/test-utils';
import Component from '../../../src/components/FacilityNumberInput.vue';

const localVue = createLocalVue();

describe('FacilityNumberInput.vue', () => {
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
    wrapper.vm.inputHandler('a1a1a');
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input).toEqual([['A1A1A']]);
  });
});

describe('FacilityNumberInput getCypressValue()', () => {
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

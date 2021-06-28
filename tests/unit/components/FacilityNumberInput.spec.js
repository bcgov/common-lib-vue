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
});

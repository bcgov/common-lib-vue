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
});

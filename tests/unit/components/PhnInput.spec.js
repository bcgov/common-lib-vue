import {
  mount,
  createLocalVue
} from '@vue/test-utils';
import Component from '../../../src/components/PhnInput.vue';

const localVue = createLocalVue();

describe('PhnInput.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component, {
      localVue,
    });
    expect(wrapper.element).toBeDefined();
  });
});

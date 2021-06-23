import {
  mount,
  createLocalVue
} from '@vue/test-utils';
import Component from '../../../src/components/Footer.vue';

const localVue = createLocalVue();

describe('Footer.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component, {
      localVue,
    });
    expect(wrapper.element).toBeDefined();
  });
});

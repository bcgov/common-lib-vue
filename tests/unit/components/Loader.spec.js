import {
  mount,
  createLocalVue
} from '@vue/test-utils';
import Component from '../../../src/components/Loader.vue';

const localVue = createLocalVue();

describe('Loader.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component, {
      localVue,
    });
    expect(wrapper.element).toBeDefined();
  });
});

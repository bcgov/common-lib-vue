import {
  mount,
  createLocalVue
} from '@vue/test-utils';
import Component from '../../../src/components/ContinueBar.vue';

const localVue = createLocalVue();

describe('ContinueBar.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component, {
      localVue,
    });
    expect(wrapper.element).toBeDefined();
  });
});

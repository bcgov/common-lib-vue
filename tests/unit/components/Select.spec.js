import {
  mount,
  createLocalVue
} from '@vue/test-utils';
import Component from '../../../src/components/Select.vue';

const localVue = createLocalVue();

describe('Select.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component, {
      localVue,
    });
    expect(wrapper.element).toBeDefined();
  });
});

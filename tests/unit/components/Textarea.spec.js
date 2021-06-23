import {
  mount,
  createLocalVue
} from '@vue/test-utils';
import Component from '../../../src/components/Textarea.vue';

const localVue = createLocalVue();

describe('Textarea.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component, {
      localVue,
    });
    expect(wrapper.element).toBeDefined();
  });
});

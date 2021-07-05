import {
  mount,
  createLocalVue
} from '@vue/test-utils';
import Component from '../../../src/components/PromptModal.vue';

const localVue = createLocalVue();

describe('PromptModal.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component, {
      localVue,
    });
    expect(wrapper.element).toBeDefined();
  });
});

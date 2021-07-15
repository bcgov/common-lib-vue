import {
  mount,
  createLocalVue
} from '@vue/test-utils';
import Component from '../../../src/components/TimeInput.vue';

const localVue = createLocalVue();

describe('TimeInput.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component, {
      localVue,
    });
    expect(wrapper.element).toBeDefined();
  });
});

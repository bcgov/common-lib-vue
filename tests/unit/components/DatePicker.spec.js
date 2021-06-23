import {
  mount,
  createLocalVue
} from '@vue/test-utils';
import Component from '../../../src/components/DatePicker.vue';

const localVue = createLocalVue();

describe('DatePicker.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component, {
      localVue,
    });
    expect(wrapper.element).toBeDefined();
  });
});

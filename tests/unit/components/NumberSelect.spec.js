import {
  mount,
  createLocalVue
} from '@vue/test-utils';
import Component from '../../../src/components/NumberSelect.vue';

const localVue = createLocalVue();

describe('NumberSelect.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component, {
      localVue,
      propsData: {
        min: 1,
        max: 10,
      }
    });
    expect(wrapper.element).toBeDefined();
  });
});

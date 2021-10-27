import {
  mount,
  createLocalVue
} from '@vue/test-utils';
import Component from '../../../src/components/CheckboxGroup.vue';

const localVue = createLocalVue();

describe('CheckboxGroup.vue', () => {
  let wrapper;

  it('renders', () => {
    wrapper = mount(Component, {
      localVue,
    });
    expect(wrapper.element).toBeDefined();
  });
});

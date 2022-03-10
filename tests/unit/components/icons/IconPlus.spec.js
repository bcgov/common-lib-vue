import {
  mount,
  createLocalVue
} from '@vue/test-utils';
import Component from '../../../../src/components/icons/IconPlus.vue';

const localVue = createLocalVue();

describe('IconPlus.vue', () => {
  let wrapper;

  it('renders', () => {
    wrapper = mount(Component, { localVue });
    expect(wrapper.element).toBeDefined();
  });
});

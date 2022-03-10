import {
  mount,
  createLocalVue
} from '@vue/test-utils';
import Component from '../../../../src/components/icons/IconChevronDoubleLeft.vue';

const localVue = createLocalVue();

describe('IconChevronDoubleLeft.vue', () => {
  let wrapper;

  it('renders', () => {
    wrapper = mount(Component, { localVue });
    expect(wrapper.element).toBeDefined();
  });
});

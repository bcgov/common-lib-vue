import {
  mount,
  createLocalVue
} from '@vue/test-utils';
import Component from '../../../../src/components/icons/IconChevronSingleLeft.vue';

const localVue = createLocalVue();

describe('IconChevronSingleLeft.vue', () => {
  let wrapper;

  it('renders', () => {
    wrapper = mount(Component, { localVue });
    expect(wrapper.element).toBeDefined();
  });
});

import {
  mount,
  createLocalVue
} from '@vue/test-utils';
import Component from '../../../../src/components/icons/IconChevronSingleRight.vue';

const localVue = createLocalVue();

describe('IconChevronSingleRight.vue', () => {
  let wrapper;

  it('renders', () => {
    wrapper = mount(Component, { localVue });
    expect(wrapper.element).toBeDefined();
  });
});

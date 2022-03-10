import {
  mount,
  createLocalVue
} from '@vue/test-utils';
import Component from '../../../../src/components/icons/IconTimes.vue';

const localVue = createLocalVue();

describe('IconTimes.vue', () => {
  let wrapper;

  it('renders', () => {
    wrapper = mount(Component, { localVue });
    expect(wrapper.element).toBeDefined();
  });
});

import {
  mount,
  createLocalVue
} from '@vue/test-utils';
import Component from '../../../src/components/DistributionBar.vue';

const localVue = createLocalVue();

describe('DistributionBar.vue', () => {
  let wrapper;

  it('renders', () => {
    wrapper = mount(Component, {
      localVue,
    });
    expect(wrapper.element).toBeDefined();
  });
});

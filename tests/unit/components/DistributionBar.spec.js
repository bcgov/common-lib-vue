import { mount } from '@vue/test-utils';
import Component from '../../../src/components/DistributionBar.vue';

describe('DistributionBar.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component);
    expect(wrapper.element).toBeDefined();
  });
});

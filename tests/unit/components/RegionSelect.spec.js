import { mount } from '@vue/test-utils';
import Component from '../../../src/components/RegionSelect.vue';

describe('RegionSelect.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component);
    expect(wrapper.element).toBeDefined();
  });
});

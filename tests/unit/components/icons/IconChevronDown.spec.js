import { mount } from '@vue/test-utils';
import Component from '../../../../src/components/icons/IconChevronDown.vue';

describe('IconChevronDown.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component);
    expect(wrapper.element).toBeDefined();
  });
});

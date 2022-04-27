import { mount } from '@vue/test-utils';
import Component from '../../../../src/components/icons/IconChevronDoubleLeft.vue';

describe('IconChevronDoubleLeft.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component);
    expect(wrapper.element).toBeDefined();
  });
});

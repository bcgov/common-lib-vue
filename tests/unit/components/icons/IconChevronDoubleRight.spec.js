import { mount } from '@vue/test-utils';
import Component from '../../../../src/components/icons/IconChevronDoubleRight.vue';

describe('IconChevronDoubleRight.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component);
    expect(wrapper.element).toBeDefined();
  });
});

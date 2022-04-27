import { mount } from '@vue/test-utils';
import Component from '../../../../src/components/icons/IconChevronUp.vue';

describe('IconChevronUp.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component);
    expect(wrapper.element).toBeDefined();
  });
});

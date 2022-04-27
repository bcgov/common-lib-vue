import { mount } from '@vue/test-utils';
import Component from '../../../../src/components/icons/IconChevronSingleLeft.vue';

describe('IconChevronSingleLeft.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component);
    expect(wrapper.element).toBeDefined();
  });
});

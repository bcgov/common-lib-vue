import { mount } from '@vue/test-utils';
import Component from '../../../../src/components/icons/IconChevronSingleRight.vue';

describe('IconChevronSingleRight.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component);
    expect(wrapper.element).toBeDefined();
  });
});

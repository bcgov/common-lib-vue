import { mount } from '@vue/test-utils';
import Component from '../../../../src/components/icons/IconPlus.vue';

describe('IconPlus.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component);
    expect(wrapper.element).toBeDefined();
  });
});

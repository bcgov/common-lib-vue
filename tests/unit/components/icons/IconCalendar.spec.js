import { mount } from '@vue/test-utils';
import Component from '../../../../src/components/icons/IconCalendar.vue';

describe('IconCalendar.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component);
    expect(wrapper.element).toBeDefined();
  });
});

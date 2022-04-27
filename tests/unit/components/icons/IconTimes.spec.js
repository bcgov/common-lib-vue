import { mount } from '@vue/test-utils';
import Component from '../../../../src/components/icons/IconTimes.vue';

describe('IconTimes.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component);
    expect(wrapper.element).toBeDefined();
  });
});

import { mount } from '@vue/test-utils';
import Component from '../../../src/components/Footer.vue';

describe('Footer.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component);
    expect(wrapper.element).toBeDefined();
  });
});

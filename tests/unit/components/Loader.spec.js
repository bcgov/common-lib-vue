import { mount } from '@vue/test-utils';
import Component from '../../../src/components/Loader.vue';

describe('Loader.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component);
    expect(wrapper.element).toBeDefined();
  });
});

import { mount } from '@vue/test-utils';
import Component from '../../../src/components/Header.vue';

describe('Header.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component, {
      props: {
        title: 'My Application Title'
      }
    });
    expect(wrapper.element).toBeDefined();
  });
});

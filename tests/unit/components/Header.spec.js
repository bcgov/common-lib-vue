import {
  mount,
  createLocalVue
} from '@vue/test-utils';
import Component from '../../../src/components/Header.vue';

const localVue = createLocalVue();

describe('Header.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component, {
      localVue,
      propsData: {
        title: 'My Application Title'
      }
    });
    expect(wrapper.element).toBeDefined();
  });
});

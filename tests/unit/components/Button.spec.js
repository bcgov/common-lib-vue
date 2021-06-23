import {
  mount,
  createLocalVue
} from '@vue/test-utils';
import Component from '../../../src/components/Button.vue';

const localVue = createLocalVue();

describe('Button.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component, {
      localVue,
      propsData: {
        label: 'My Button'
      }
    });
    expect(wrapper.element).toBeDefined();
  });
});

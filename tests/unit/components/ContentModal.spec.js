import {
  mount,
  createLocalVue
} from '@vue/test-utils';
import Component from '../../../src/components/ContentModal.vue';

const localVue = createLocalVue();

describe('ContentModal.vue', () => {
  let wrapper;
  beforeEach(() => {});
  it('renders', () => {
    wrapper = mount(Component, {
      localVue,
      propsData: {
        title: 'My Modal',
      }
    });
    expect(wrapper.element).toBeDefined();
  });
});

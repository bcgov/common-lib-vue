import {
  mount,
  createLocalVue
} from '@vue/test-utils';
import Component from '../../../src/components/PageContent.vue';

const localVue = createLocalVue();

describe('PageContent.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component, {
      localVue,
    });
    expect(wrapper.element).toBeDefined();
  });
});

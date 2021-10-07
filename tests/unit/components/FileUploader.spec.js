import {
  mount,
  createLocalVue
} from '@vue/test-utils';
import Component from '../../../src/components/FileUploader.vue';

const localVue = createLocalVue();

describe('FileUploader.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component, {
      localVue,
    });
    expect(wrapper.element).toBeDefined();
  });
});

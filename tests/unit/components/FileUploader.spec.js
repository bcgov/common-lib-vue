import { mount } from '@vue/test-utils';
import Component from '../../../src/components/FileUploader.vue';

describe('FileUploader.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component);
    expect(wrapper.element).toBeDefined();
  });
});

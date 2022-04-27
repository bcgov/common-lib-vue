import { mount } from '@vue/test-utils';
import Component from '../../../src/components/CountrySelect.vue';

describe('CountrySelect.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component);
    expect(wrapper.element).toBeDefined();
  });

  it('should emit "input" event when changing value of select dropdown', async () => {
    const wrapper = mount(Component);
    await wrapper.find('select').trigger('change', {
      value: 'Canada',
    });
    expect(wrapper.emitted().input.length).toBe(1);
  });

  it('should emit "blur" event when losing focus of the select dropdown', async () => {
    const wrapper = mount(Component);
    await wrapper.find('select').trigger('blur');
    expect(wrapper.emitted().blur.length).toBe(1);
  });
});

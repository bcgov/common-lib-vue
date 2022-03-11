import {
  mount,
  createLocalVue
} from '@vue/test-utils';
import Component from '../../../src/components/CheckboxGroup.vue';

const localVue = createLocalVue();

describe('CheckboxGroup.vue', () => {
  let wrapper;

  it('renders', () => {
    wrapper = mount(Component, {
      localVue,
    });
    expect(wrapper.element).toBeDefined();
  });

  it('emits "input" event when changing checkbox value', async () => {
    wrapper = mount(Component, {
      localVue,
      propsData: {
        label: 'Toggle me!',
        items: [
          {
            label: 'Item A',
            value: 'A',
            id: 'a',
          },
          {
            label: 'Item B',
            value: 'B',
            id: 'b',
          }
        ]
      }
    });
    await wrapper.find('input[type=checkbox]').trigger('click');
    expect(wrapper.emitted().input.length).toBe(1);
  });

  it('does not emit "input" event when clicking disabled checkbox', async () => {
    wrapper = mount(Component, {
      localVue,
      propsData: {
        label: 'Toggle me!',
        items: [
          {
            label: 'Item A',
            value: 'A',
            id: 'a',
            disabled: true,
          },
          {
            label: 'Item B',
            value: 'B',
            id: 'b',
          }
        ]
      }
    });
    await wrapper.find('input[type=checkbox]').trigger('click');
    expect(wrapper.emitted().input).not.toBeDefined();
  });
});

import {
  mount,
  createLocalVue
} from '@vue/test-utils';
import Component from '../../../src/components/Checkbox.vue';

const localVue = createLocalVue();

describe('Checkbox.vue', () => {
  let wrapper;

  it('renders', () => {
    wrapper = mount(Component, {
      localVue,
      propsData: {
        label: 'Toggle me!',
      }
    });
    expect(wrapper.element).toBeDefined();
  });
  
  it('contains cypress Value', () => {
    wrapper = mount(Component, {
      localVue,
      propsData: {
        label: 'Toggle me!',
        cypressId: 'potato'
      }
    });
    expect(wrapper.find("[data-cy=potato]").exists()).toBe(true)
  });

  it('emits input event when changing checkbox value', async () => {
    wrapper = mount(Component, {
      localVue,
      propsData: {
        label: 'Toggle me!'
      }
    });
    await wrapper.find('input[type=checkbox]').trigger('change');
    expect(wrapper.emitted().input.length).toBe(1);
  });
});

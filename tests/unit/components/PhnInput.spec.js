import {
  mount,
  createLocalVue
} from '@vue/test-utils';
import Component from '../../../src/components/PhnInput.vue';

const localVue = createLocalVue();

describe('PhnInput.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component, {
      localVue,
    });
    expect(wrapper.element).toBeDefined();
  });
});

describe('PhnInput cyValue()', () => {
  it('contains cyValue content', () => {
    const wrapper = mount(Component, {
      localVue,
      propsData: {
        cypressId: 'potato'
      }
    });
    expect(wrapper.find("[data-cy=potato]").exists()).toBe(true)
  });
});

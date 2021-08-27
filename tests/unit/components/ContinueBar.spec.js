import {
  mount,
  createLocalVue
} from '@vue/test-utils';
import Component from '../../../src/components/ContinueBar.vue';

const localVue = createLocalVue();

describe('ContinueBar.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component, {
      localVue,
    });
    expect(wrapper.element).toBeDefined();
  });
});

describe('ContinueBar.vue cyValue()', () => {
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


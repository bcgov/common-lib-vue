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
  it('contains cyValue', () => {
    const wrapper = mount(Component, {
      localVue,
      propsData: {
        label: 'My Button',
        cypressId: 'potato'
      }
    });
    expect(wrapper.find("button[data-cy=potato").exists()).toBe(true)
  });
});


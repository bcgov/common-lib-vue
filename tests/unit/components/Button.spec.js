import {
  mount,
  createLocalVue
} from '@vue/test-utils';
import Component from '../../../src/components/Button.vue';

const localVue = createLocalVue();

describe('Button.vue', () => {
  let wrapper;
  beforeEach(() => {});
  it('renders', () => {
    wrapper = mount(Component, {
      localVue,
      propsData: {
        label: 'My Button',
      }
    });
    expect(wrapper.element).toBeDefined();
  });
  it('contains cyValue', () => {
    wrapper = mount(Component, {
      localVue,
      propsData: {
        label: 'My Button',
        cypressId: 'potato'
      }
    });
    expect(wrapper.find("[data-cy=potato]").exists()).toBe(true)
  });
});

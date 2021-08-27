import {
  mount,
  createLocalVue
} from '@vue/test-utils';
import Component from '../../../src/components/PromptModal.vue';

const localVue = createLocalVue();

describe('PromptModal.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component, {
      localVue,
    });
    expect(wrapper.element).toBeDefined();
  });
});

describe('PromptModal cyValue()', () => {
  it('contains cyValue content', () => {
    const wrapper = mount(Component, {
      localVue,
      propsData: {
        cypressId: 'potato'
      }
    });
    expect(wrapper.find("[data-cy=potatoLeft]").exists()).toBe(true)
    expect(wrapper.find("[data-cy=potatoRight]").exists()).toBe(true)
  });
});
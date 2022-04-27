import { mount } from '@vue/test-utils';
import Component from '../../../src/components/PromptModal.vue';

describe('PromptModal.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component);
    expect(wrapper.element).toBeDefined();
  });
});

describe('PromptModal getCypressValue()', () => {
  it('contains cypress Value', () => {
    const wrapper = mount(Component, {
      props: {
        cypressId: 'potato'
      }
    });
    expect(wrapper.find("[data-cy=potatoLeft]").exists()).toBe(true)
    expect(wrapper.find("[data-cy=potatoRight]").exists()).toBe(true)
  });
});
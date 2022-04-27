import { mount } from '@vue/test-utils';
import Component from '../../../src/components/PhnInput.vue';

describe('PhnInput.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component);
    expect(wrapper.element).toBeDefined();
  });
});

describe('PhnInput getCypressValue()', () => {
  it('contains cypress Value', () => {
    const wrapper = mount(Component, {
      props: {
        cypressId: 'potato'
      }
    });
    expect(wrapper.find("[data-cy=potato]").exists()).toBe(true)
  });
});

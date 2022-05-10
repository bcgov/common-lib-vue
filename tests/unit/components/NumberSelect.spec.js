import { mount } from '@vue/test-utils';
import Component from '../../../src/components/NumberSelect.vue';

describe('NumberSelect.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component, {
      props: {
        min: 1,
        max: 10,
      },
    });
    expect(wrapper.element).toBeDefined();
  });
});

describe('NumberSelect getCypressValue()', () => {
  it('contains cypress Value', () => {
    const wrapper = mount(Component, {
      props: {
        cypressId: 'potato',
        min: 1,
        max: 10,
      },
    });
    expect(wrapper.find("[data-cy=potato1]").exists()).toBe(true)
  });
});
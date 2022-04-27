import { mount } from '@vue/test-utils';
import Component from '../../../src/components/Select.vue';

describe('Select.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component);
    expect(wrapper.element).toBeDefined();
  });
});

describe('Select getCypressValue()', () => {
  it('contains cypress Value', () => {
    const wrapper = mount(Component, {
      props: {
        cypressId: 'potato',
        options: [
          {
            "value": "A",
            "label": "Option A"
          },
          {
            "value": "B",
            "label": "Option B"
          },
          {
            "value": "C",
            "label": "Option C"
          }
        ]
      }
    });
    expect(wrapper.find("[data-cy=potato1]").exists()).toBe(true)
  });
});

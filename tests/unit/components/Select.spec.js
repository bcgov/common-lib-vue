import {
  mount,
  createLocalVue
} from '@vue/test-utils';
import Component from '../../../src/components/Select.vue';

const localVue = createLocalVue();

describe('Select.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component, {
      localVue,
    });
    expect(wrapper.element).toBeDefined();
  });
});

describe('cyValue()', () => {
  it('contains cyValue', () => {
    const wrapper = mount(Component, {
      localVue,
      propsData: {
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

import {
  mount,
  createLocalVue
} from '@vue/test-utils';
import Component from '../../../src/components/TimeInput.vue';

const localVue = createLocalVue();

describe('TimeInput.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component, {
      localVue,
    });
    expect(wrapper.element).toBeDefined();
  });
});

describe('TimeInput getCypressValue()', () => {
  it('contains cypress Value', () => {
    const wrapper = mount(Component, {
      localVue,
      propsData: {
        cypressId: 'potato'
      }
    });
    expect(wrapper.find("[data-cy=potatoHour1]").exists()).toBe(true)
    expect(wrapper.find("[data-cy=potatoMinute1]").exists()).toBe(true)
  });
});
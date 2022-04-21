import {
  mount,
} from '@vue/test-utils';
import Component from '../../../src/components/DatePicker.vue';

describe('DatePicker.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component, {});
    expect(wrapper.element).toBeDefined();
  });
});

describe('DatePicker getCypressValue()', () => {
  it('contains cypress Value', () => {
    const wrapper = mount(Component, {
      propsData: {
        cypressId: 'potato'
      }
    });
    expect(wrapper.find("[data-cy=potatoChevronDoubleLeft]").exists()).toBe(true)
    expect(wrapper.find("[data-cy=potatoChevronLeft]").exists()).toBe(true)
    expect(wrapper.find("[data-cy=potatoChevronRight]").exists()).toBe(true)
    expect(wrapper.find("[data-cy=potatoChevronDoubleRight]").exists()).toBe(true)
    expect(wrapper.find("[data-cy=potatoDay0]").exists()).toBe(true)
  });
});

import {
  mount,
  createLocalVue
} from '@vue/test-utils';
import Component from '../../../src/components/DatePicker.vue';

const localVue = createLocalVue();

describe('DatePicker.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component, {
      localVue,
    });
    expect(wrapper.element).toBeDefined();
  });
});

describe('DatePicker cyValue()', () => {
  it('contains cyValue', () => {
    const wrapper = mount(Component, {
      localVue,
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

import {
  mount,
  createLocalVue
} from '@vue/test-utils';
import Component from '../../../src/components/PhoneNumberInput.vue';

const localVue = createLocalVue();

describe('PhoneNumberInput.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component, {
      localVue,
    });
    expect(wrapper.element).toBeDefined();
  });
});

describe('PhoneNumberInput cyValue()', () => {
  it('contains cyValue content', () => {
    const wrapper = mount(Component, {
      localVue,
      propsData: {
        cypressId: 'potato'
      }
    });
    expect(wrapper.find("[data-cy=potato]").exists()).toBe(true)
  });
});

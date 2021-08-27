import {
  mount,
  createLocalVue
} from '@vue/test-utils';
import Component from '../../../src/components/PractitionerNumberInput.vue';

const localVue = createLocalVue();

describe('PractitionerNumberInput.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component, {
      localVue,
    });
    expect(wrapper.element).toBeDefined();
  });

  it('emits input event with upper case string', () => {
    const wrapper = mount(Component, {
      localVue,
    });
    wrapper.vm.inputHandler('a1234');
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input).toEqual([['A1234']]);
  });
});

describe('PractitionerNumberInput cyValue()', () => {
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

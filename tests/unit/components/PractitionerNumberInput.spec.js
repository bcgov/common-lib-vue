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
});

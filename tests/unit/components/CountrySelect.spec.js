import {
  mount,
  createLocalVue
} from '@vue/test-utils';
import Component from '../../../src/components/CountrySelect.vue';

const localVue = createLocalVue();

describe('CountrySelect.vue', () => {
  let wrapper;
  beforeEach(() => {});
  it('renders', () => {
    wrapper = mount(Component, {
      localVue
    });
    expect(wrapper.element).toBeDefined();
  });
});

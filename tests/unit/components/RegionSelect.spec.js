import {
  mount,
  createLocalVue
} from '@vue/test-utils';
import Component from '../../../src/components/RegionSelect.vue';

const localVue = createLocalVue();

describe('RegionSelect.vue', () => {
  let wrapper;
  beforeEach(() => {});
  it('renders', () => {
    wrapper = mount(Component, {
      localVue
    });
    expect(wrapper.element).toBeDefined();
  });
});

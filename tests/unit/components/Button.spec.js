import {
  mount,
  createLocalVue
} from '@vue/test-utils';
import Component from '../../../src/components/Button.vue';

const localVue = createLocalVue();

describe('Button.vue', () => {
  let wrapper;
  beforeEach(() => {});
  it('renders', () => {
    wrapper = mount(Component, {
      localVue,
      propsData: {
        label: 'My Button'
      }
    });
    expect(wrapper.element).toBeDefined();
  });
  it('returns proper cyValue (text)', () => {
    wrapper = mount(Component, {
      localVue,
      propsData: {
        label: 'My Button',
        cypressId: 'potato'
      }
    });
    const result = wrapper.vm.cyValue();
    // const dataCyTag = wrapper.find([data-cy="potato"])
    expect(result).toEqual("potato");
    // expect(wrapper.contains('data-cy')).toBe(true)
  });
  it('returns proper cyValue (null)', () => {
    wrapper = mount(Component, {
      localVue,
      propsData: {
        label: 'My Button',
        cypressId: null
      }
    });
    const result = wrapper.vm.cyValue();
    expect(result).toBeNull();
  });
});

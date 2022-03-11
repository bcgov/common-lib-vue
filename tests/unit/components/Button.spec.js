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
        label: 'My Button',
      }
    });
    expect(wrapper.element).toBeDefined();
  });

  it('contains cypress Value', () => {
    wrapper = mount(Component, {
      localVue,
      propsData: {
        label: 'My Button',
        cypressId: 'potato'
      }
    });
    expect(wrapper.find("[data-cy=potato]").exists()).toBe(true)
  });

  it('emits click event', async () => {
    wrapper = mount(Component, {
      localVue,
      propsData: {
        label: 'My Button'
      }
    });
    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted().click.length).toBe(1);
  });
});

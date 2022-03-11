import {
  mount,
  createLocalVue
} from '@vue/test-utils';
import Component from '../../../src/components/ContinueBar.vue';

const localVue = createLocalVue();

describe('ContinueBar.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component, {
      localVue,
    });
    expect(wrapper.element).toBeDefined();
  });

  it('should emit "continue" event when "Continue" button is clicked', async () => {
    const wrapper = mount(Component, {
      localVue,
    });
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted().continue.length).toBe(1);
  });

  it('should emit "secondary" event when secondary button is clicked', async () => {
    const wrapper = mount(Component, {
      localVue,
      propsData: {
        hasSecondaryButton: true,
        secondaryButtonLabel: 'Hello',
      }
    });
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted().secondary.length).toBe(1);
  });

  it('should have "sticky" CSS class when "isSticky" is true', async () => {
    const wrapper = mount(Component, {
      localVue,
      propsData: {
        isSticky: true,
      }
    });
    expect(wrapper.element.querySelector('.sticky')).toBeDefined();
  });

  it('should not have "sticky" CSS class when "isSticky" is false', async () => {
    const wrapper = mount(Component, {
      localVue,
      propsData: {
        isSticky: false,
      }
    });
    expect(wrapper.element.querySelector('.sticky')).toBe(null);
  });
});

describe('ContinueBar.vue getCypressValue()', () => {
  it('contains cypress Value', () => {
    const wrapper = mount(Component, {
      localVue,
      propsData: {
        cypressId: 'potato'
      }
    });
    expect(wrapper.find("[data-cy=potato]").exists()).toBe(true)
  });
});

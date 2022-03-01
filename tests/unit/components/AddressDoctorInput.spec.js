import {
  mount,
  createLocalVue
} from '@vue/test-utils';
import Component from '../../../src/components/AddressDoctorInput.vue';

const localVue = createLocalVue();

describe('AddressDoctorInput.vue', () => {
  // This is a Shallow Mount as opposed to a regular mount because this test only checks for rendering
  it('renders', () => {
    const wrapper = mount(Component, {
      localVue,
    });
    expect(wrapper.element).toBeDefined();
  });

  it('emits input correctly through built in method', () => {
    const wrapper = mount(Component, {
      localVue,
    });
    const fakeEvent = {
      target: {
        value: "potato"
      }
    };
    wrapper.vm.inputHandler(fakeEvent);
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input).toEqual([
      ["potato"]
    ]);
  });
});

describe('AddressDoctorInput getCypressValue()', () => {
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

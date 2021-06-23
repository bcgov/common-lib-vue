import {
  mount,
  createLocalVue
} from '@vue/test-utils';
import Component from '../../../src/components/Radio.vue';

const localVue = createLocalVue();

describe('Radio.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component, {
      localVue,
      propsData: {
        items: [
          {
            id: 'yes',
            label: 'Yes',
            value: 'Y'
          },
          {
            id: 'no',
            label: 'No',
            value: 'N'
          }
        ]
      }
    });
    expect(wrapper.element).toBeDefined();
  });
});

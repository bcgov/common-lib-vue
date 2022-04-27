import { mount } from '@vue/test-utils';
import Component from '../../../src/components/Radio.vue';

describe('Radio.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component, {
      props: {
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

describe('Radio.vue getCypressValue()', () => {
  it('contains getCypressValue when props contains items with id', () => {
    const wrapper = mount(Component, {
      props: {
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
        ],
        cypressId: 'potato'
      }
    });
    expect(wrapper.find("[data-cy=potatoyes]").exists()).toBe(true)
    expect(wrapper.find("[data-cy=potatono]").exists()).toBe(true)
  });
  it('contains getCypressValue when props contains items with label', () => {
    const wrapper = mount(Component, {
      props: {
        items: [
          {
            id: null,
            label: 'Yes',
            value: 'Y'
          },
          {
            id: null,
            label: 'No',
            value: 'N'
          }
        ],
        cypressId: 'potato'
      }
    });
    expect(wrapper.find("[data-cy=potatoYes]").exists()).toBe(true)
    expect(wrapper.find("[data-cy=potatoNo]").exists()).toBe(true)
  });
  it('does not contain getCypressValue when neither are present', () => {
    const wrapper = mount(Component, {
      props: {
        items: [
          {
            id: null,
            label: null,
            value: 'Y'
          },
          {
            id: null,
            label: null,
            value: 'N'
          }
        ],
        cypressId: 'potato'
      }
    });
    expect(wrapper.find("[data-cy=potatoYes]").exists()).toBe(false)
    expect(wrapper.find("[data-cy=potatoNo]").exists()).toBe(false)
    expect(wrapper.find("[data-cy=potatoyes]").exists()).toBe(false)
    expect(wrapper.find("[data-cy=potatono]").exists()).toBe(false)
  });
});
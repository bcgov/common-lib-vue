import { mount } from '@vue/test-utils';
import Radio from '../../../src/components/Radio.vue';

const items = [
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

describe('Radio.vue', () => {
  it('renders', () => {
    const wrapper = mount(Radio, {
      props: {
        items
      }
    });
    expect(wrapper.element).toBeDefined();
  });
});

describe('Radio.vue getCypressValue()', () => {
  it('contains getCypressValue when props contains items with id', () => {
    const wrapper = mount(Radio, {
      props: {
        items,
        cypressId: 'potato'
      }
    });
    expect(wrapper.find("[data-cy=potatoyes]").exists()).toBe(true)
    expect(wrapper.find("[data-cy=potatono]").exists()).toBe(true)
  });
  it('contains getCypressValue when props contains items with label', () => {
    const wrapper = mount(Radio, {
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
    const wrapper = mount(Radio, {
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

describe("Radio event handling", () => {
  it("works correctly with v-model", async () => {
    const wrapper = mount({
      data() {
        return { 
          selected: null,
          items,
        };
      },
      template: '<div><Radio v-model="selected" :items="items" /></div>',
      components: { Radio },
    });

    expect(wrapper.vm.selected).toBe(null);
    await wrapper.findAll('input').at(1).setChecked();
    expect(wrapper.vm.selected).toBe("N");
  });
});
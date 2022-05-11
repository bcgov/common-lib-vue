import { mount } from '@vue/test-utils';
import NumberSelect from '../../../src/components/NumberSelect.vue';

describe('NumberSelect.vue', () => {
  it('renders', () => {
    const wrapper = mount(NumberSelect, {
      props: {
        min: 1,
        max: 10,
      },
    });
    expect(wrapper.element).toBeDefined();
  });

  it("works correctly with v-model", async () => {
    const wrapper = mount({
      data() {
        return { number: "3", };
      },
      template: '<div><NumberSelect v-model="number" :min="1" :max="10" /></div>',
      components: { NumberSelect, },
    });
    const options = wrapper.find('select').findAll('option')
    // 11 with default value
    expect(options.length).toBe(11);
    expect(options[3].element.selected).toBe(true)

    await options.at(4).setSelected()
    expect(wrapper.vm.number).toBe("4");
  });
});

describe('NumberSelect getCypressValue()', () => {
  it('contains cypress Value', () => {
    const wrapper = mount(NumberSelect, {
      props: {
        cypressId: 'potato',
        min: 1,
        max: 10,
      },
    });
    expect(wrapper.find("[data-cy=potato1]").exists()).toBe(true)
  });
});
import { mount } from '@vue/test-utils';
import Textarea from '../../../src/components/Textarea.vue';

describe('Textarea.vue', () => {
  it('renders', () => {
    const wrapper = mount(Textarea);
    expect(wrapper.element).toBeDefined();
  });
});

describe('Textarea getCypressValue()', () => {
  it('contains cypress Value', () => {
    const wrapper = mount(Textarea, {
      props: {
        cypressId: 'potato'
      }
    });
    expect(wrapper.find("[data-cy=potato]").exists()).toBe(true)
  });
});

describe("Textarea event handling", () => {
  it("works correctly with v-model", async () => {
    const wrapper = mount({
      data() {
        return { text: "Hello" };
      },
      template: '<div><Textarea v-model="text" /></div>',
      components: { Textarea },
    });

    expect(wrapper.vm.text).toBe("Hello");
    const baseInput = wrapper.find("textarea");
    await baseInput.setValue("Goodbye");
    expect(wrapper.vm.text).toBe("Goodbye");
  });
});

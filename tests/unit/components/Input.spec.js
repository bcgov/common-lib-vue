import { mount } from '@vue/test-utils';
import Input from '../../../src/components/Input.vue';

describe('Input.vue', () => {
  // This is a Shallow Mount as opposed to a regular mount because this test only checks for rendering
  it('renders', () => {
    const wrapper = mount(Input);
    expect(wrapper.element).toBeDefined();
  });

  it('emits input correctly through built in method', () => {
    const wrapper = mount(Input);
    const fakeEvent = {
      target: {
        value: "potato",
      },
    };
    wrapper.vm.inputHandler(fakeEvent);
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input).toEqual([
      [
        "potato",
      ],
    ]);
  });

  it("works correctly with v-model", async () => {
    const wrapper = mount({
      data() {
        return { 
          val: "test",
        };
      },
      template: '<div><Input v-model="val" /></div>',
      components: { Input, },
    });
    const input = wrapper.find('input');
    expect(input.element.value).toBe("test");

    input.setValue("42")
    expect(wrapper.vm.val).toBe("42");
  });
});

describe('Input getCypressValue()', () => {
  it('contains cypress Value', () => {
    const wrapper = mount(Input, {
      props: {
        cypressId: 'potato',
      },
    });
    expect(wrapper.find("[data-cy=potato]").exists()).toBe(true)
  });
});

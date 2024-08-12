import { mount } from "@vue/test-utils";
import Checkbox from "@/components/CheckboxComponent.vue";
import { it, describe, expect } from "vitest";

describe("CheckboxComponent.vue", () => {
  let wrapper;

  it("renders", () => {
    wrapper = mount(Checkbox, {
      props: {
        label: "Toggle me!",
      },
    });
    expect(wrapper.element).toBeDefined();
  });
  it("contains cypress Value", () => {
    wrapper = mount(Checkbox, {
      props: {
        label: "Toggle me!",
        cypressId: "potato",
      },
    });
    expect(wrapper.find("[data-cy=potato]").exists()).toBe(true);
  });
});

describe("Checkbox event handling", () => {
  it("works correctly with v-model", async () => {
    const wrapper = mount({
      data() {
        return {
          selected: null,
        };
      },
      template: '<div><Checkbox v-model="selected" /></div>',
      components: { Checkbox },
    });

    // Renders with default model value
    const renderedCheckbox = wrapper.find("input[type=checkbox]");
    expect(wrapper.vm.selected).toBe(null);

    // True when checked
    await renderedCheckbox.setChecked(true);
    expect(wrapper.vm.selected).toBe(true);

    // False when unchecked
    await renderedCheckbox.setChecked(false);
    expect(wrapper.vm.selected).toBe(false);
  });

  it("emits input event when changing checkbox value", async () => {
    const wrapper = mount(Checkbox, {
      props: {
        label: "Toggle me!",
      },
    });
    await wrapper.find("input[type=checkbox]").trigger("change");
    expect(wrapper.emitted().input.length).toBe(1);
  });
});

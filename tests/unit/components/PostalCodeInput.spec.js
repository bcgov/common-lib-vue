import { mount } from "@vue/test-utils";
import PostalCodeInput from "@/components/PostalCodeInput.vue";
import { it, describe, expect } from "vitest";

describe("PostalCodeInput.vue", () => {
  it("renders", () => {
    const wrapper = mount(PostalCodeInput);
    expect(wrapper.element).toBeDefined();
  });
  it("emits input event with upper case string", () => {
    const wrapper = mount(PostalCodeInput);
    const testEvent = { target: { value: "v8v 8v8" } };
    wrapper.vm.inputHandler(testEvent);
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input).toEqual([["V8V 8V8"]]);
  });
});

describe("PostalCodeInput getCypressValue()", () => {
  it("contains cypress Value", () => {
    const wrapper = mount(PostalCodeInput, {
      props: {
        cypressId: "potato",
      },
    });
    expect(wrapper.find("[data-cy=potato]").exists()).toBe(true);
  });
});

describe("PostalCodeInput event handling", () => {
  it("works correctly with v-model", async () => {
    const wrapper = mount({
      data() {
        return { code: null };
      },
      template: '<div><PostalCodeInput v-model="code" /></div>',
      components: { PostalCodeInput },
    });

    expect(wrapper.vm.code).toBe(null);
    const baseInput = wrapper.find("input");
    await baseInput.setValue("A");
    expect(wrapper.vm.code).toBe("A");
  });

  it("applies the expected mask to emitted event", async () => {
    const wrapper = mount(PostalCodeInput);
    const baseInput = wrapper.find("input");
    const getLastUpdateEmit = () => wrapper.emitted("update:modelValue").slice(-1)[0][0];

    // First char must be letter
    await baseInput.setValue("2");
    expect(getLastUpdateEmit()).toBe(null);
    await baseInput.setValue("a");
    // Emitted event is capitalized
    expect(getLastUpdateEmit()).toBe("A");
    // Masks adds a space
    await baseInput.setValue("A3A7V7");
    expect(getLastUpdateEmit()).toBe("A3A 7V7");
  });
});

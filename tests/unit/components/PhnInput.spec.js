import { mount } from "@vue/test-utils";
import PhnInput from "@/components/PhnInput.vue";
import { it, describe, expect } from "vitest";

describe("PhnInput.vue", () => {
  it("renders", () => {
    const wrapper = mount(PhnInput);
    expect(wrapper.element).toBeDefined();
  });
});

describe("PhnInput getCypressValue()", () => {
  it("contains cypress Value", () => {
    const wrapper = mount(PhnInput, {
      props: {
        cypressId: "potato",
      },
    });
    expect(wrapper.find("[data-cy=potato]").exists()).toBe(true);
  });
});

describe("PhnInput event handling", () => {
  it("works correctly with v-model", async () => {
    const wrapper = mount({
      data() {
        return { phn: null };
      },
      template: '<div><PhnInput v-model="phn" /></div>',
      components: { PhnInput },
    });

    expect(wrapper.vm.phn).toBe(null);
    const baseInput = wrapper.find("input");
    await baseInput.setValue("9999999998");
    expect(wrapper.vm.phn).toBe("9999 999 998");
  });

  it("applies the expected mask to emitted event", async () => {
    const wrapper = mount(PhnInput);
    const baseInput = wrapper.find("input");
    const getLastUpdateEmit = () => wrapper.emitted("update:modelValue").slice(-1)[0][0];

    // All chars must be numbers
    await baseInput.setValue("A");
    expect(getLastUpdateEmit()).toBe("");
    // Masks adds a space
    await baseInput.setValue("9999999998");
    expect(getLastUpdateEmit()).toBe("9999 999 998");
  });
});

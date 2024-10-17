import { mount } from "@vue/test-utils";
import PractitionerNumberInput from "@/components/PractitionerNumberInput.vue";
import { it, describe, expect } from "vitest";

describe("PractitionerNumberInput.vue", () => {
  it("renders", () => {
    const wrapper = mount(PractitionerNumberInput);
    expect(wrapper.element).toBeDefined();
  });
});

describe("PractitionerNumberInput getCypressValue()", () => {
  it("contains cypress Value", () => {
    const wrapper = mount(PractitionerNumberInput, {
      props: {
        cypressId: "potato",
      },
    });
    expect(wrapper.find("[data-cy=potato]").exists()).toBe(true);
  });
});

describe("PractitionerNumberInput event handling", () => {
  it("works correctly with v-model", async () => {
    const wrapper = mount({
      data() {
        return { num: "2" };
      },
      template: '<div><PractitionerNumberInput v-model="num" /></div>',
      components: { PractitionerNumberInput },
    });

    expect(wrapper.vm.num).toBe("2");
    const baseInput = wrapper.find("input");
    await baseInput.setValue("3");
    expect(wrapper.vm.num).toBe("3");
  });

  it("applies the expected mask to emitted event", async () => {
    const wrapper = mount(PractitionerNumberInput);
    const baseInput = wrapper.find("input");
    const getLastUpdateEmit = () => wrapper.emitted("update:modelValue").slice(-1)[0][0];

    // First char can be a number or letter
    await baseInput.setValue("A");
    expect(getLastUpdateEmit()).toBe("A");
    // Second char can only be a number
    await baseInput.setValue("AA");
    expect(getLastUpdateEmit()).toBe("A");
    // Emitted event is uppercased
    await baseInput.setValue("a1234");
    expect(getLastUpdateEmit()).toBe("A1234");
  });
});

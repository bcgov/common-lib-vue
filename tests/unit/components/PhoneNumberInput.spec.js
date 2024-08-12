import { mount } from "@vue/test-utils";
import PhoneNumberInput from "@/components/PhoneNumberInput.vue";
import { it, describe, expect } from "vitest";

describe("PhoneNumberInput.vue", () => {
  it("renders", () => {
    const wrapper = mount(PhoneNumberInput);
    expect(wrapper.element).toBeDefined();
  });
});

describe("PhoneNumberInput getCypressValue()", () => {
  it("contains cypress Value", () => {
    const wrapper = mount(PhoneNumberInput, {
      props: {
        cypressId: "potato",
      },
    });
    expect(wrapper.find("[data-cy=potato]").exists()).toBe(true);
  });
});

describe("PhoneNumberInput event handling", () => {
  it("works correctly with v-model", async () => {
    const wrapper = mount({
      data() {
        return { phone: "2" };
      },
      template: '<div> <PhoneNumberInput v-model="phone" /></div>',
      components: { PhoneNumberInput },
    });

    expect(wrapper.vm.phone).toBe("2");
    const baseInput = wrapper.find("input");
    await baseInput.setValue("3");

    // Mask adds a bracket
    expect(wrapper.vm.phone).toBe("(3");
  });

  it("applies the expected mask to emitted event", async () => {
    const wrapper = mount(PhoneNumberInput);
    const baseInput = wrapper.find("input");
    const getLastUpdateEmit = () => wrapper.emitted("update:modelValue").slice(-1)[0][0];

    // First digit must be >= 2
    await baseInput.setValue("0");
    expect(getLastUpdateEmit()).toBe("(");
    await baseInput.setValue("1");
    expect(getLastUpdateEmit()).toBe("(");

    await baseInput.setValue("211");
    expect(getLastUpdateEmit()).toBe("(211) ");

    await baseInput.setValue("2111111111");
    expect(getLastUpdateEmit()).toBe("(211) 111-1111");
  });
});

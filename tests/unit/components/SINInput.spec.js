import { mount } from "@vue/test-utils";
import SINInput, { sinValidator } from "@/components/SINInput.vue";
import { it, describe, expect } from "vitest";

describe("SINInput.vue", () => {
  it("renders", () => {
    const wrapper = mount(SINInput);
    expect(wrapper.element).toBeDefined();
  });
});

describe("SINInput getCypressValue()", () => {
  it("contains cypress Value", () => {
    const wrapper = mount(SINInput, {
      props: {
        cypressId: "potato",
      },
    });
    expect(wrapper.find("[data-cy=potato]").exists()).toBe(true);
  });
});

describe("sinValidator", () => {
  it("returns expected result", () => {
    expect(sinValidator("123456782")).toBe(true);
    expect(sinValidator("123 456 782")).toBe(true);
    expect(sinValidator("123456789")).toBe(false);
    expect(sinValidator("123 456 789")).toBe(false);
    expect(sinValidator("000000000")).toBe(false);
    expect(sinValidator("000 000 000")).toBe(false);
    expect(sinValidator("123")).toBe(false);
    expect(sinValidator(123456789)).toBe(false);
    expect(sinValidator("")).toBe(false);
    expect(sinValidator(undefined)).toBe(false);
    expect(sinValidator(null)).toBe(false);
    expect(sinValidator(NaN)).toBe(false);
  });
});

describe("SINInput event handling", () => {
  it("works correctly with v-model", async () => {
    const wrapper = mount({
      data() {
        return { mySIN: "" };
      },
      template: '<div><SINInput v-model="mySIN" /></div>',
      components: { SINInput },
    });

    expect(wrapper.vm.mySIN).toBe("");
    const baseInput = wrapper.find("input");
    await baseInput.setValue("999999998");

    // Mask adds spaces
    expect(wrapper.vm.mySIN).toBe("999 999 998");
  });
});

import { mount } from "@vue/test-utils";
import NumberInput, {
  intValidator,
  floatValidator,
  positiveNumberValidator,
  negativeNumberValidator,
  nonZeroNumberValidator,
  dollarNumberValidator,
} from "@/components/NumberInput.vue";
import { it, describe, expect } from "vitest";

describe("NumberInput.vue", () => {
  it("renders", () => {
    const wrapper = mount(NumberInput);
    expect(wrapper.element).toBeDefined();
  });

  it("works correctly with v-model", async () => {
    const wrapper = mount({
      data() {
        return {
          val: "10",
        };
      },
      template: '<div><NumberInput v-model="val" /></div>',
      components: { NumberInput },
    });
    const input = wrapper.find("input");
    expect(input.element.value).toBe("10");

    input.setValue("42");
    expect(wrapper.vm.val).toBe("42");
  });
});

describe("Number validators", () => {
  it("intValidator", () => {
    expect(intValidator(123)).toBe(true);
    expect(intValidator("123")).toBe(true);
    expect(intValidator(-123)).toBe(true);
    expect(intValidator("-123")).toBe(true);
    expect(intValidator(123.123)).toBe(false);
    expect(intValidator("123.123")).toBe(false);
    expect(intValidator(-123.123)).toBe(false);
    expect(intValidator("-123.123")).toBe(false);
    expect(intValidator(undefined)).toBe(false);
    expect(intValidator(null)).toBe(false);
    expect(intValidator(NaN)).toBe(false);
  });

  it("floatValidator", () => {
    expect(floatValidator(123)).toBe(false);
    expect(floatValidator("123")).toBe(false);
    expect(floatValidator(-123)).toBe(false);
    expect(floatValidator("-123")).toBe(false);
    expect(floatValidator(123.123)).toBe(true);
    expect(floatValidator("123.123")).toBe(true);
    expect(floatValidator(-123.123)).toBe(true);
    expect(floatValidator("-123.123")).toBe(true);
    expect(floatValidator(undefined)).toBe(false);
    expect(floatValidator(null)).toBe(false);
    expect(floatValidator(NaN)).toBe(false);
  });

  it("positiveNumberValidator", () => {
    expect(positiveNumberValidator(123)).toBe(true);
    expect(positiveNumberValidator("123")).toBe(true);
    expect(positiveNumberValidator(-123)).toBe(false);
    expect(positiveNumberValidator("-123")).toBe(false);
    expect(positiveNumberValidator(123.123)).toBe(true);
    expect(positiveNumberValidator("123.123")).toBe(true);
    expect(positiveNumberValidator(-123.123)).toBe(false);
    expect(positiveNumberValidator("-123.123")).toBe(false);
    expect(positiveNumberValidator(undefined)).toBe(false);
    expect(positiveNumberValidator(null)).toBe(false);
    expect(positiveNumberValidator(NaN)).toBe(false);
  });

  it("negativeNumberValidator", () => {
    expect(negativeNumberValidator(123)).toBe(false);
    expect(negativeNumberValidator("123")).toBe(false);
    expect(negativeNumberValidator(-123)).toBe(true);
    expect(negativeNumberValidator("-123")).toBe(true);
    expect(negativeNumberValidator(123.123)).toBe(false);
    expect(negativeNumberValidator("123.123")).toBe(false);
    expect(negativeNumberValidator(-123.123)).toBe(true);
    expect(negativeNumberValidator("-123.123")).toBe(true);
    expect(negativeNumberValidator(undefined)).toBe(false);
    expect(negativeNumberValidator(null)).toBe(false);
    expect(negativeNumberValidator(NaN)).toBe(false);
  });

  it("nonZeroNumberValidator", () => {
    expect(nonZeroNumberValidator(123)).toBe(true);
    expect(nonZeroNumberValidator("123")).toBe(true);
    expect(nonZeroNumberValidator(-123)).toBe(true);
    expect(nonZeroNumberValidator("-123")).toBe(true);
    expect(nonZeroNumberValidator(123.123)).toBe(true);
    expect(nonZeroNumberValidator("123.123")).toBe(true);
    expect(nonZeroNumberValidator(-123.123)).toBe(true);
    expect(nonZeroNumberValidator("-123.123")).toBe(true);
    expect(nonZeroNumberValidator(0)).toBe(false);
    expect(nonZeroNumberValidator("0")).toBe(false);
    expect(nonZeroNumberValidator(undefined)).toBe(false);
    expect(nonZeroNumberValidator(null)).toBe(false);
    expect(nonZeroNumberValidator(NaN)).toBe(false);
  });

  it("dollarNumberValidator", () => {
    expect(dollarNumberValidator(123)).toBe(false);
    expect(dollarNumberValidator("123")).toBe(false);
    expect(dollarNumberValidator(-123)).toBe(false);
    expect(dollarNumberValidator("-123")).toBe(false);
    expect(dollarNumberValidator(123.123)).toBe(false);
    expect(dollarNumberValidator("123.123")).toBe(false);
    expect(dollarNumberValidator(-123.123)).toBe(false);
    expect(dollarNumberValidator("-123.123")).toBe(false);
    expect(dollarNumberValidator(0)).toBe(false);
    expect(dollarNumberValidator("0")).toBe(false);
    expect(dollarNumberValidator(123.12)).toBe(true);
    expect(dollarNumberValidator("123.12")).toBe(true);
    expect(dollarNumberValidator(-123.12)).toBe(true);
    expect(dollarNumberValidator("-123.12")).toBe(true);
    expect(dollarNumberValidator(0.0)).toBe(false);
    expect(dollarNumberValidator("0.00")).toBe(true);
    expect(dollarNumberValidator(undefined)).toBe(false);
    expect(dollarNumberValidator(null)).toBe(false);
    expect(dollarNumberValidator(NaN)).toBe(false);
  });
});

describe("NumberInput getCypressValue()", () => {
  it("contains cypress Value", () => {
    const wrapper = mount(NumberInput, {
      props: {
        cypressId: "potato",
      },
    });
    expect(wrapper.find("[data-cy=potato]").exists()).toBe(true);
  });
});

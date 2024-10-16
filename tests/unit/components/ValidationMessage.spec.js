import { mount } from "@vue/test-utils";
import ValidationMessage from "@/components/ValidationMessage.vue";
import { it, describe, expect } from "vitest";

describe("ValidationMessage.vue", () => {
  it("renders", () => {
    const wrapper = mount(ValidationMessage);
    expect(wrapper.element).toBeDefined();
  });
});

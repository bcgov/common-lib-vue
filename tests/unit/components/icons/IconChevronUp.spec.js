import { mount } from "@vue/test-utils";
import Component from "@/components/icons/IconChevronUp.vue";
import { it, describe, expect } from "vitest";

describe("IconChevronUp.vue", () => {
  it("renders", () => {
    const wrapper = mount(Component);
    expect(wrapper.element).toBeDefined();
  });
});

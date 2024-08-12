import { mount } from "@vue/test-utils";
import Component from "@/components/icons/IconPlus.vue";
import { it, describe, expect } from "vitest";

describe("IconPlus.vue", () => {
  it("renders", () => {
    const wrapper = mount(Component);
    expect(wrapper.element).toBeDefined();
  });
});

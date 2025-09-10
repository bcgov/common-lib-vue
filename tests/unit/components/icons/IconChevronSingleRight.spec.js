import { mount } from "@vue/test-utils";
import Component from "@/components/icons/IconChevronSingleRight.vue";
import { it, describe, expect } from "vitest";

describe("IconChevronSingleRight.vue", () => {
  it("renders", () => {
    const wrapper = mount(Component);
    expect(wrapper.element).toBeDefined();
  });
});

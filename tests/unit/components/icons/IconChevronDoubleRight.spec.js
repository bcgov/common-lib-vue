import { mount } from "@vue/test-utils";
import Component from "@/components/icons/IconChevronDoubleRight.vue";
import { it, describe, expect } from "vitest";

describe("IconChevronDoubleRight.vue", () => {
  it("renders", () => {
    const wrapper = mount(Component);
    expect(wrapper.element).toBeDefined();
  });
});

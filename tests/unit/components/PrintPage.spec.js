import { mount } from "@vue/test-utils";
import Component from "@/components/PrintPage.vue";
import { it, describe, expect } from "vitest";

describe("PrintPage.vue", () => {
  it("renders", () => {
    const wrapper = mount(Component);
    expect(wrapper.element).toBeDefined();
  });
});

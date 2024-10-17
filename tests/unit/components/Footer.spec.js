import { mount } from "@vue/test-utils";
import Component from "@/components/FooterComponent.vue";
import { it, describe, expect } from "vitest";

describe("FooterComponent.vue", () => {
  it("renders", () => {
    const wrapper = mount(Component);
    expect(wrapper.element).toBeDefined();
  });
});

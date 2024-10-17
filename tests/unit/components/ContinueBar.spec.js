import { mount } from "@vue/test-utils";
import Component from "@/components/ContinueBar.vue";
import { it, describe, expect } from "vitest";

describe("ContinueBar.vue", () => {
  it("renders", () => {
    const wrapper = mount(Component);
    expect(wrapper.element).toBeDefined();
  });

  it('should emit "continue" event when "Continue" button is clicked', async () => {
    const wrapper = mount(Component);
    await wrapper.find("button").trigger("click");
    expect(wrapper.emitted().continue.length).toBe(1);
  });

  it('should emit "secondary" event when secondary button is clicked', async () => {
    const wrapper = mount(Component, {
      props: {
        hasSecondaryButton: true,
        secondaryButtonLabel: "Hello",
      },
    });
    await wrapper.find("button").trigger("click");
    expect(wrapper.emitted().secondary.length).toBe(1);
  });

  it('should have "sticky" CSS class when "isSticky" is true', async () => {
    const wrapper = mount(Component, {
      props: {
        isSticky: true,
      },
    });
    expect(wrapper.element.querySelector(".sticky")).toBeDefined();
  });

  it('should not have "sticky" CSS class when "isSticky" is false', async () => {
    const wrapper = mount(Component, {
      props: {
        isSticky: false,
      },
    });
    expect(wrapper.element.querySelector(".sticky")).toBe(null);
  });
});

describe("ContinueBar.vue getCypressValue()", () => {
  it("contains cypress Value", () => {
    const wrapper = mount(Component, {
      props: {
        cypressId: "potato",
      },
    });
    expect(wrapper.find("[data-cy=potato]").exists()).toBe(true);
  });
});

import { mount } from "@vue/test-utils";
import PromptModal from "@/components/PromptModal.vue";
import { it, describe, expect } from "vitest";

describe("PromptModal.vue", () => {
  it("renders", () => {
    const wrapper = mount(PromptModal);
    expect(wrapper.element).toBeDefined();
  });
});

describe("PromptModal getCypressValue()", () => {
  it("contains cypress Value", () => {
    const wrapper = mount(PromptModal, {
      props: {
        cypressId: "potato",
      },
    });
    expect(wrapper.find("[data-cy=potatoLeft]").exists()).toBe(true);
    expect(wrapper.find("[data-cy=potatoRight]").exists()).toBe(true);
  });
});

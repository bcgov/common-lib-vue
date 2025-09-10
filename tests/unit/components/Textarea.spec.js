import { mount } from "@vue/test-utils";
import Textarea from "@/components/TextareaComponent.vue";
import { it, describe, expect } from "vitest";

describe("TextareaComponent.vue", () => {
  it("renders", () => {
    const wrapper = mount(Textarea);
    expect(wrapper.element).toBeDefined();
  });
});

describe("TextareaComponent getCypressValue()", () => {
  it("contains cypress Value", () => {
    const wrapper = mount(Textarea, {
      props: {
        cypressId: "potato",
      },
    });
    expect(wrapper.find("[data-cy=potato]").exists()).toBe(true);
  });
});

describe("TextareaComponent event handling", () => {
  it("works correctly with v-model", async () => {
    const wrapper = mount({
      data() {
        return { text: "Hello" };
      },
      template: '<div><Textarea v-model="text" /></div>',
      components: { Textarea },
    });

    expect(wrapper.vm.text).toBe("Hello");
    const baseInput = wrapper.find("textarea");
    await baseInput.setValue("Goodbye");
    expect(wrapper.vm.text).toBe("Goodbye");
  });
});

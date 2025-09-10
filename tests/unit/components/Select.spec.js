import { mount } from "@vue/test-utils";
import Select from "@/components/SelectComponent.vue";
import { it, describe, expect } from "vitest";

const options = [
  {
    value: "A",
    label: "Option A",
  },
  {
    value: "B",
    label: "Option B",
  },
  {
    value: "C",
    label: "Option C",
  },
];

describe("SelectComponent.vue", () => {
  it("renders", () => {
    const wrapper = mount(Select);
    expect(wrapper.element).toBeDefined();
  });
});

describe("SelectComponent getCypressValue()", () => {
  it("contains cypress Value", () => {
    const wrapper = mount(Select, {
      props: {
        cypressId: "potato",
        options,
      },
    });
    expect(wrapper.find("[data-cy=potato1]").exists()).toBe(true);
  });
});

describe("SelectComponent event handling", () => {
  it("works correctly with v-model", async () => {
    const wrapper = mount({
      data() {
        return {
          selected: null,
          options,
        };
      },
      template: '<div><Select v-model="selected" :options="options" /></div>',
      components: { Select },
    });

    expect(wrapper.vm.selected).toBe(null);
    // Select third option (placeholder is first)
    await wrapper.findAll("option").at(2).setSelected();
    expect(wrapper.vm.selected).toBe("B");
  });
});

import { mount } from "@vue/test-utils";
import RegionSelect from "@/components/RegionSelect.vue";
import { it, describe, expect } from "vitest";

describe("RegionSelect.vue", () => {
  it("renders", () => {
    const wrapper = mount(RegionSelect);
    expect(wrapper.element).toBeDefined();
  });
});

describe("RegionSelect event handling", () => {
  it("works correctly with v-model", async () => {
    const wrapper = mount({
      data() {
        return { reg: null };
      },
      template: '<div><RegionSelect v-model="reg" /></div>',
      components: { RegionSelect },
    });

    expect(wrapper.vm.reg).toBe(null);
    // Wait a cycle for options to populate
    wrapper.vm.$nextTick(async () => {
      // Select third option (placeholder is first)
      await wrapper.findAll("option").at(2).setSelected();
      expect(wrapper.vm.reg).toBe("British Columbia");
    });
  });
});

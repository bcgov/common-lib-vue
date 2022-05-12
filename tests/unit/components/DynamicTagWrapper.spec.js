import { mount } from "@vue/test-utils";
import DynamicTagWrapper from "../../../src/components/DynamicTagWrapper.vue";

describe("DynamicTagWrapper.vue", () => {
  it("renders with expected tag", () => {
    const wrapper = mount({
      template: '<div><DynamicTagWrapper tag="a" /></div>',
      components: { DynamicTagWrapper, },
    });
    const tag = wrapper.find('a')
    expect(tag).toBeDefined();
  });

  it("Displays the expected slot content", () => {
    const wrapper = mount({
      template: '<div><DynamicTagWrapper tag="span"> 42 </DynamicTagWrapper> </div>',
      components: { DynamicTagWrapper, },
    });
    const TagWrapper = wrapper.find('span')
    expect(TagWrapper.text()).toBe("42")
  });
});

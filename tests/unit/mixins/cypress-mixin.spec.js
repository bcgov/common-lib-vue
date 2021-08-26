import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import MockComponent from "../__mocks__/MockComponent";
import { cyValueMixin } from "../../../src/mixins/cypress-mixin.js";

const localVue = createLocalVue();

describe("cyValueMixin", () => {
  it("renders without breaking", () => {
    const wrapper = mount(MockComponent, {
        localVue,
        mixins: [ cyValueMixin ],
        propsData: {
          label: "My Button",
          cypressId: "potato",
        },
      });
      expect(wrapper.element).toBeDefined();
  })
    it("returns proper cyValue (yes CypressId, no argument)", () => {
    const wrapper = shallowMount(MockComponent, {
      localVue,
      mixins: [cyValueMixin],
      propsData: {
        label: "My Button",
        cypressId: "potato",
      },
    });
    console.log(wrapper.vm.cypressId)
    const result = wrapper.vm.cyValue();
    expect(result).toEqual("potato");
  });
  it("returns proper cyValue (no CypressId, no argument)", () => {
    const wrapper = shallowMount(MockComponent, {
      localVue,
      mixins: [cyValueMixin],
      propsData: {
        label: "My Button",
        cypressId: null,
      },
    });
    const result = wrapper.vm.cyValue();
    expect(result).toBeNull();
  });
});

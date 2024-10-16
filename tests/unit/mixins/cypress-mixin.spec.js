import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import MockComponent from "../__mocks__/MockComponent";
import cypressMixin from "../../../src/mixins/cypress-mixin.js";

const localVue = createLocalVue();

describe("cypressMixin", () => {
  it("returns proper getCypressValue (yes CypressId, no argument)", () => {
    const wrapper = mount(MockComponent, {
      localVue,
      mixins: [cypressMixin],
      propsData: {
        label: "My Button",
        cypressId: "potato",
      },
    });
    const result = wrapper.vm.getCypressValue();
    expect(result).toEqual("potato");
  });
  it("returns proper getCypressValue (yes CypressId, yes argument)", () => {
    const wrapper = mount(MockComponent, {
      localVue,
      mixins: [cypressMixin],
      propsData: {
        label: "My Button",
        cypressId: "potato",
      },
    });
    const result = wrapper.vm.getCypressValue(2);
    expect(result).toEqual("potato2");
  });
  it("returns proper getCypressValue (no CypressId, no argument)", () => {
    const wrapper = shallowMount(MockComponent, {
      localVue,
      mixins: [cypressMixin],
      propsData: {
        label: "My Button",
        cypressId: null,
      },
    });
    const result = wrapper.vm.getCypressValue();
    expect(result).toBeNull();
  });
  it("returns proper getCypressValue (no CypressId, no argument)", () => {
    const wrapper = shallowMount(MockComponent, {
      localVue,
      mixins: [cypressMixin],
      propsData: {
        label: "My Button",
        cypressId: null,
      },
    });
    const result = wrapper.vm.getCypressValue(2);
    expect(result).toBeNull();
  });
});

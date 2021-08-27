import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import MockComponent from "../__mocks__/MockComponent";
import cypressMixin from "../../../src/mixins/cypress-mixin.js";

const localVue = createLocalVue();

describe("cypressMixin", () => {
  it("returns proper cyValue (yes CypressId, no argument)", () => {
    const wrapper = mount(MockComponent, {
      localVue,
      mixins: [cypressMixin],
      propsData: {
        label: "My Button",
        cypressId: "potato",
      },
    });
    const result = wrapper.vm.cyValue();
    expect(result).toEqual("potato");
  });
  it("returns proper cyValue (yes CypressId, yes argument)", () => {
    const wrapper = mount(MockComponent, {
      localVue,
      mixins: [cypressMixin],
      propsData: {
        label: "My Button",
        cypressId: "potato",
      },
    });
    const result = wrapper.vm.cyValue(2);
    expect(result).toEqual("potato2");
  });
  it("returns proper cyValue (no CypressId, no argument)", () => {
    const wrapper = shallowMount(MockComponent, {
      localVue,
      mixins: [cypressMixin],
      propsData: {
        label: "My Button",
        cypressId: null,
      },
    });
    const result = wrapper.vm.cyValue();
    expect(result).toBeNull();
  });
  it("returns proper cyValue (no CypressId, no argument)", () => {
    const wrapper = shallowMount(MockComponent, {
      localVue,
      mixins: [cypressMixin],
      propsData: {
        label: "My Button",
        cypressId: null,
      },
    });
    const result = wrapper.vm.cyValue(2);
    expect(result).toBeNull();
  });
});

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

  it('receives any passed listeners', async () => {
    const handleClick = jest.fn();
    const wrapper = mount({
      methods: {
        handleClick,
      },
      template: '<div><DynamicTagWrapper tag="span" @click="handleClick" > 42 </DynamicTagWrapper> </div>',
      components: { DynamicTagWrapper, },
    });
    expect(handleClick).not.toHaveBeenCalled();
    const dynamicTag = wrapper.find('span');
    await dynamicTag.trigger('click');
    expect(handleClick).toHaveBeenCalledTimes(1)
  });

  it('receives any passed attributes', () => {
    const wrapper = mount({
      template: '<div><DynamicTagWrapper tag="a" id="test-id" data-cy="cypress-test-id" href="example.com"> 42 </DynamicTagWrapper> </div>',
      components: { DynamicTagWrapper, },
    });
    const dynamicTag = wrapper.find('a');
    expect(dynamicTag.attributes().id).toBe('test-id');
    expect(dynamicTag.attributes()['data-cy']).toBe('cypress-test-id');
    expect(dynamicTag.attributes().href).toBe('example.com');
  });
});

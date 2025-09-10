import { mount } from "@vue/test-utils";
import FileUploader from "@/components/FileUploader.vue";
import { it, describe, expect } from "vitest";
import "@vitest/web-worker";

describe("FileUploader.vue", () => {
  it("renders", () => {
    const wrapper = mount(FileUploader);
    expect(wrapper.element).toBeDefined();
  });

  it("Displays and removes added images", async () => {
    const wrapper = mount({
      data() {
        return { files: [{}] };
      },
      template: '<div><FileUploader v-model="files" /></div>',
      components: { FileUploader },
    });
    let images = wrapper.findAll("img");
    expect(images.length).toBe(1);

    const removeButton = wrapper.findAll("a").filter((anchor) => anchor.text() === "Remove")[0];
    await removeButton.trigger("click");

    images = wrapper.findAll("img");
    expect(images.length).toBe(0);
    expect(wrapper.vm.files.length).toBe(0);
  });
});

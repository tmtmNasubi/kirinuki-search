import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import RamInputForm from "../Ram/RamInputForm.vue";
import { extractYouTubeVideoId } from "../../composables/searchApi";

describe("RamInputForm", () => {
  it("renders a labeled input and emits submitted value", async () => {
    const wrapper = mount(RamInputForm, {
      props: {
        label: "メールアドレス",
        placeholder: "you@popkit.jp",
        actionLabel: "登録",
      },
    });

    await wrapper.find("input").setValue("you@popkit.jp");
    await wrapper.find("form").trigger("submit");

    expect(wrapper.find("label").text()).toContain("メールアドレス");
    expect(wrapper.find("input").attributes("placeholder")).toBe("you@popkit.jp");
    expect(wrapper.emitted("submit")).toEqual([["you@popkit.jp"]]);
  });
});

describe("extractYouTubeVideoId", () => {
  it("extracts videoId from common YouTube URL formats", () => {
    expect(extractYouTubeVideoId("https://www.youtube.com/watch?v=dQw4w9WgXcQ")).toBe(
      "dQw4w9WgXcQ",
    );
    expect(extractYouTubeVideoId("https://youtu.be/dQw4w9WgXcQ?t=30")).toBe("dQw4w9WgXcQ");
    expect(extractYouTubeVideoId("https://www.youtube.com/shorts/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
    expect(extractYouTubeVideoId("dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
  });

  it("rejects URLs without a valid videoId", () => {
    expect(() => extractYouTubeVideoId("https://example.com/watch?v=dQw4w9WgXcQ")).toThrow(
      "YouTube",
    );
  });
});

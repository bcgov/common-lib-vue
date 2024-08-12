import { cloneDeep } from "@/helpers/utils";
import { it, describe, expect } from "vitest";

describe("Util helpers", () => {
  it("cloneDeep", () => {
    const date = new Date();
    const obj = {
      date: date,
    };
    const arr1 = [];
    const arr2 = [{ test: [] }];
    expect(cloneDeep(date)).not.toBe(date);
    expect(cloneDeep(date.toUTCString())).toBe(date.toUTCString());
    expect(cloneDeep(obj).date).toBeDefined();
    expect(cloneDeep(obj).date).not.toBe(date);
    expect(cloneDeep(obj).date.toUTCString()).toBe(date.toUTCString());
    expect(cloneDeep("test")).toBe("test");
    expect(cloneDeep(123)).toBe(123);
    expect(cloneDeep(arr1)).not.toBe(arr1);
    expect(cloneDeep(arr2)).not.toBe(arr2);
    expect(cloneDeep(arr1)).toEqual(arr1);
    expect(cloneDeep(arr2)).toEqual(arr2);
    expect(cloneDeep(undefined)).toEqual(undefined);
    expect(cloneDeep(null)).toEqual(null);
    expect(cloneDeep(NaN)).toEqual(NaN);
  });
});

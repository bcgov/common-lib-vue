import { getProvinceNameByCode, truncateAddressLines } from "@/helpers/address";
import { it, describe, expect } from "vitest";

/*
The purpose of this function is to break address lines if the lines exceed the specified maximum length.

Example:
Unit 123
123 Hello World Street

would become:
 
Unit 123
123 Hello World
Street

KNOWN BUG: The function uses a space delimiter, so trailing spaces each become their own array elements.
I included a test for this should the bug be fixed one day, but it's skipped until then.
*/

describe("truncateAddressLines", () => {
  it("returns a non-empty array", () => {
    const result = truncateAddressLines(
      ["AAAAA BBBBB CCCCC", "DDDDD EEEEE", "FFFFF GGGGG HHHHH IIII"],
      2
    );

    expect(result).toBeDefined();
    expect(result).not.toEqual([]);
    expect(Array.isArray(result)).toEqual(true);
  });

  // it.skip("does not turn trailing spaces into individual elements", () => {
  //   const result = truncateAddressLines(["AAAAA ", "BBBBB ", "CCCCC "], 2);

  //   expect(result).toEqual(["AAAAA", "BBBBB", "CCCCC"]);
  //   expect(result).not.toEqual(["AAAAA", "", "BBBBB", "", "CCCCC", ""]);
  // });

  it("returns an array with elements split up by spaces when the array elements longer than the parameter passed along", () => {
    const result = truncateAddressLines(["AAAAA BBBBB CCCCC", "DDDDD EEEEE", "FFFFF GGGGG"], 2);

    expect(result).toEqual(["AAAAA", "BBBBB", "CCCCC", "DDDDD", "EEEEE", "FFFFF", "GGGGG"]);
  });

  it("does not split up array elements that are shorter than the parameter passed along", () => {
    const result = truncateAddressLines(["AAAAA BBBBB CCCCC", "DDDDD EEEEE", "FFFFF GGGGG"], 12);

    expect(result).toEqual(["AAAAA BBBBB", "CCCCC", "DDDDD EEEEE", "FFFFF GGGGG"]);
  });

  it("works on data formatted like addresses", () => {
    const result = truncateAddressLines(
      ["123 Pekwachnamaykoskwaskwaypinwanik Lake", "Unit 123"],
      12
    );

    expect(result).toEqual(["123", "Pekwachnamaykoskwaskwaypinwanik", "Lake", "Unit 123"]);
  });

  it("works on data formatted like addresses (case 2)", () => {
    const result = truncateAddressLines(["716 Yates Street Victoria, BC V8W 1K4"], 12);

    expect(result).toEqual(["716 Yates", "Street", "Victoria, BC", "V8W 1K4"]);
  });
});

describe("getProvinceNameByCode", () => {
  it("returns an expected value", () => {
    expect(getProvinceNameByCode("BC")).toBe("British Columbia");
    expect(getProvinceNameByCode("unknown")).toBe("unknown");
    expect(getProvinceNameByCode(123)).toBe(123);
    expect(getProvinceNameByCode(0)).toBe(0);
    expect(getProvinceNameByCode(undefined)).toBe(undefined);
    expect(getProvinceNameByCode(null)).toBe(null);
    expect(getProvinceNameByCode(NaN)).toBe(NaN);
  });
});

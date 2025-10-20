import { BusinessProviderData } from "~/lib/bussiness/domain";

describe("Business/domain/value-objects/business-provider-data", () => {
  it("should create from primitives", () => {
    expect(BusinessProviderData.fromPrimitives(0).value).toBe("AUTH");
  });

  it("should throw error when value is invalid", () => {
    expect(() => BusinessProviderData.create("ANY PROVIDER")).toThrow(
      "Invalid value: ANY PROVIDER"
    );
  });

  it("should throw error when value primitive is invalid", () => {
    expect(() => BusinessProviderData.fromPrimitives(5 as 0 | 1 | 2)).toThrow(
      "Invalid value: 5"
    );
  });
});

import { ProviderData } from "~/lib/Hotel/domain";

describe("Hotel/domain/value-objects/hotel-providerData", () => {
    it("should create from primitives", () => {
    expect(ProviderData.fromPrimitives(0).value).toBe("AUTH");
  });

  it("should throw error when value is invalid", () => {
    expect(() => ProviderData.create("ANY PROVIDER" as any)).toThrow(
      "Invalid value: ANY PROVIDER"
    );
  });

  it("should throw error when value primitive is invalid", () => {
    expect(() => ProviderData.fromPrimitives(5 as 0 | 1 | 2)).toThrow(
      "Invalid value: 5"
    );
  });
})
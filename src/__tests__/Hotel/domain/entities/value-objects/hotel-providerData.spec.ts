import { ProviderData } from "~/lib/Hotel/domain";

describe("Hotel/domain/value-objects/hotel-providerData", () => {
  it("should create from primitives", () => {
    const provider = ProviderData.fromPrimitives(0);
    expect(provider.value).toBe("AUTH");
  });

  it("should create from valid string value", () => {
    const provider = ProviderData.create("AUTH");
    expect(provider.value).toBe("AUTH");
  });

  it("should throw error when value is invalid string", () => {
    expect(() => ProviderData.create("ANY PROVIDER" as any)).toThrow(
      "Invalid value: ANY PROVIDER"
    );
  });

  it("should throw error when primitive value is invalid number", () => {
    expect(() => ProviderData.fromPrimitives(5 as 0 | 1 | 2)).toThrow(
      "Invalid value: 5"
    );
  });
});

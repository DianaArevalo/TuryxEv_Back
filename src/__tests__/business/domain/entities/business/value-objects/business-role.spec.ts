import { BusinessRole } from "~/lib/bussiness/domain";

describe("Business/domain/value-objects/business-role", () => {
  it("should create from primitives", () => {
    expect(BusinessRole.fromPrimitives(0).value).toBe("BUSINESS");
  });

  it("should throw error when value is invalid", () => {
    expect(() => BusinessRole.create("ANY Role")).toThrow(
      "Invalid value: ANY Role"
    );
  });

  it("should throw error when value primitive is invalid", () => {
    expect(() => BusinessRole.fromPrimitives(5 as 0 | 1)).toThrow(
      "Invalid value: 5"
    );
  });
});

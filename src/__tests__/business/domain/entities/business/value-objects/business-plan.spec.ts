import { BusinessPlan } from "~/lib/bussiness/domain";

describe("Business/domain/value-objects/business-plan", () => {
  it("should create from primitives", () => {
    expect(BusinessPlan.fromPrimitives(0).value).toBe("FREE");
  });

  it("should throw error when value is invalid", () => {
    expect(() => BusinessPlan.create("ANY PLAN")).toThrow(
      "Invalid value: ANY PLAN"
    );
  });

  it("should throw error when value primitive is invalid", () => {
    expect(() => BusinessPlan.fromPrimitives(5 as 0 | 1 | 2)).toThrow(
      "Invalid value: 5"
    );
  });
});

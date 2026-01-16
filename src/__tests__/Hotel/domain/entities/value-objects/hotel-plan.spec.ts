import { HotelPlan, HotelPlanT } from "~/lib/Hotel/domain";

describe("Hotel/domain/value-objects/hotel-plan", () => {
  it("should create from primitives", () => {
    const plan = HotelPlan.fromPrimitives(0);
    expect(plan.value).toBe("FREE");
  });

  it("should create using create() method", () => {
    const plan = HotelPlan.create("BASIC");
    expect(plan.toPrimitives()).toBe(1);
    expect(plan.getValue()).toBe("BASIC");
  });

  it("should throw error when primitive value is invalid", () => {
    expect(() => HotelPlan.fromPrimitives(5 as 0 | 1 | 2)).toThrow(
      "Invalid value: 5"
    );
  });

  it("should throw error when string value is invalid", () => {
    expect(() => HotelPlan.create("ANY PLAN" as any)).toThrow(
      "Invalid value: ANY PLAN"
    );
  });
});

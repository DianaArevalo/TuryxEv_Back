import { HttpError} from "~/lib/Shared/domain";
import { UserPlan } from "~/lib/User/domain/entities/User/value-objects";

describe("UserPlan Value Object", () => {
  it("should create a valid plan using string", () => {
    const plan = UserPlan.create("BASIC");
    expect(plan.value).toBe("BASIC");
  });

  it("should throw ValidationError for invalid string", () => {
    expect(() => UserPlan.create("INVALID")).toThrow(HttpError);
  });

  it("should create from primitive number (0,1,2)", () => {
    const plan = UserPlan.fromPrimitives(2);
    expect(plan.value).toBe("PREMIUM");
  });

  it("should throw ValidationError for invalid primitive", () => {
    expect(() => UserPlan.fromPrimitives(5 as any)).toThrow(HttpError);
  });

  it("should convert plan to primitive number", () => {
    const plan = UserPlan.create("FREE");
    expect(plan.toPrimitives()).toBe(0);
  });

  it("should create default plan as FREE", () => {
    const plan = UserPlan.default();
    expect(plan.value).toBe("FREE");
  });
});
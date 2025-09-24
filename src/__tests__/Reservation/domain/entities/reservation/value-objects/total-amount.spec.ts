import { ReservationTotalAmount } from "~/lib/Reservation/domain";

describe("ReservationTotalAmount", () => {
  it("should create a valid ReservationTotalAmount with positive value", () => {
    const amount = ReservationTotalAmount.create(123.45);

    expect(amount).toBeInstanceOf(ReservationTotalAmount);
    // Internally stored in cents
    expect(amount.value).toBe(12345);
  });

  it("should throw if value is negative", () => {
    expect(() => ReservationTotalAmount.create(-10)).toThrow(
      "TotalAmount no puede ser negativo"
    );
  });

  it("should correctly convert to primitives (cents)", () => {
    const amount = ReservationTotalAmount.create(50);

    expect(amount.toPrimitives()).toBe(5000);
  });

  it("should correctly convert back to decimal", () => {
    const amount = ReservationTotalAmount.create(99.99);

    expect(amount.toDecimal()).toBeCloseTo(99.99, 2);
  });

  it("should round to nearest cent when creating", () => {
    const amount = ReservationTotalAmount.create(10.555);

    // 10.555 * 100 = 1055.5 -> rounded = 1056
    expect(amount.value).toBe(1056);
    expect(amount.toDecimal()).toBeCloseTo(10.56, 2);
  });
});

import { UserCreatedAt } from "~/lib/User/domain/UserCreatedAt";

describe("domain/UserCreatedAt", () => {
  it("should accept a valid Date object", () => {
    const date = new Date("2025-01-01T00:00:00Z");
    const createdAt = new UserCreatedAt(date);
    expect(createdAt.value).toEqual(date);
  });

  it("should accept a valid string date", () => {
    const createdAt = new UserCreatedAt("2025-01-01T00:00:00Z");
    expect(createdAt.value).toBeInstanceOf(Date);
  });

  it("should accept a valid timestamp (number)", () => {
    const now = Date.now();
    const createdAt = new UserCreatedAt(now);
    expect(createdAt.value.getTime()).toBeCloseTo(now, -2);
  });

  it("should throw for invalid date string", () => {
    expect(() => new UserCreatedAt("not-a-date")).toThrow(
      "Fecha de creación inválida"
    );
  });

  it("should throw if date is in the future", () => {
    const future = Date.now() + 5000; // 5 segundos en el futuro
    expect(() => new UserCreatedAt(future)).toThrow(
      "La fecha de creacion debe estar en pasado o igual al presente"
    );
  });
});

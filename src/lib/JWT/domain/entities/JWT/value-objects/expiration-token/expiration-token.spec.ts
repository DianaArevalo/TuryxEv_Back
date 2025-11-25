import { HttpError } from "~/lib/Shared/domain";
import { TokenExpiration } from "./ExpirationToken";

describe("TokenExpiration", () => {
  const futureDate = new Date(Date.now() + 1000 * 60 * 60); // 1 hora en el futuro
  const pastDate = new Date(Date.now() - 1000 * 60 * 60); // 1 hora en el pasado

  it("should throw error if value is not a valid date", () => {
    expect(() => TokenExpiration.create("invalid-date")).toThrow(HttpError);
    expect(() => TokenExpiration.create("invalid-date")).toThrow("Invalid expiration date");
  });

  it("should throw error if date is in the past", () => {
    expect(() => TokenExpiration.create(pastDate)).toThrow(HttpError);
    expect(() => TokenExpiration.create(pastDate)).toThrow("Token expiration must be a future date");
  });

  it("should create a TokenExpiration with a future date", () => {
    const tokenExp = TokenExpiration.create(futureDate);
    expect(tokenExp).toBeInstanceOf(TokenExpiration);
    expect(tokenExp.getValue().getTime()).toBe(futureDate.getTime());
  });

  it("isExpired() should return false for future date", () => {
    const tokenExp = TokenExpiration.create(futureDate);
    expect(tokenExp.isExpired()).toBe(false);
  });

  it("isExpired() should return true for past date", () => {
    const tokenExp = new TokenExpiration(pastDate);
    expect(tokenExp.isExpired()).toBe(true);
  });

  it("toTimestamp() should return correct timestamp", () => {
    const tokenExp = TokenExpiration.create(futureDate);
    expect(tokenExp.toTimestamp()).toBe(futureDate.getTime());
  });

  it("should accept different input types", () => {
    const dateString = futureDate.toISOString();
    const dateNumber = futureDate.getTime();

    const fromString = TokenExpiration.create(dateString);
    expect(fromString.getValue().getTime()).toBe(futureDate.getTime());

    const fromNumber = TokenExpiration.create(dateNumber);
    expect(fromNumber.getValue().getTime()).toBe(futureDate.getTime());
  });
});

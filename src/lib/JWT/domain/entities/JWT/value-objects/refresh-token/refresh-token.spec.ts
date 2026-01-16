import { HttpError } from "~/lib/Shared/domain";
import { RefreshToken } from "./RefreshToken";

describe("RefreshToken", () => {
  const validToken = "header.payload.signature";

  it("should throw ValidationError if value is empty", () => {
    expect(() => RefreshToken.create("")).toThrow(HttpError);
    expect(() => RefreshToken.create("   ")).toThrow("Invalid refresh token");
  });

  it("should throw ValidationError if token is malformed", () => {
    expect(() => RefreshToken.create("onepart")).toThrow(HttpError);
    expect(() => RefreshToken.create("part1.part2")).toThrow("Malformed refresh token");
    expect(() => RefreshToken.create("part1.part2.part3.part4")).toThrow("Malformed refresh token");
  });

  it("should create a RefreshToken with a valid value", () => {
    const token = RefreshToken.create(validToken);
    expect(token).toBeInstanceOf(RefreshToken);
    expect(token.getValue()).toBe(validToken);
  });

  it("getValue() should return the original token", () => {
    const token = RefreshToken.create(validToken);
    expect(token.getValue()).toBe(validToken);
  });
});
import { HttpError, ValidationError } from "~/lib/Shared/domain";
import { AccessToken } from "./AccessToken";

describe("AccessToken", () => {
  const validToken = "header.payload.signature";

  it("should throw error if value is empty", () => {
    expect(() => AccessToken.create("")).toThrow("Invalid access token");
    expect(() => AccessToken.create("   ")).toThrow("Invalid access token");
  });

  it("should throw error if token is malformed", () => {
      expect(() => AccessToken.create("onepart")).toThrow("Malformed JWT token");
  expect(() => AccessToken.create("part1.part2")).toThrow("Malformed JWT token");
  expect(() => AccessToken.create("part1.part2.part3.part4")).toThrow("Malformed JWT token");
  });

  it("should create an AccessToken with a valid value", () => {
    const token = AccessToken.create(validToken);
    expect(token).toBeInstanceOf(AccessToken);
    expect(token.getValue()).toBe(validToken);
  });

  it("getValue() should return the original token", () => {
    const token = AccessToken.create(validToken);
    expect(token.getValue()).toBe(validToken);
  });
});
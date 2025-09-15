import { UserPassword } from "~/lib/User/domain/UserPassword";

describe("domain/UserPassword", () => {
  it("should accept a valid password", () => {
    expect(() => new UserPassword("$uper$ecretPassw0rd")).not.toThrow();
  });

  it("should throw if length is less than 8", () => {
    expect(() => new UserPassword("$R0rt")).toThrow();
  });

  it("should throw if missing uppercase letter", () => {
    expect(() => new UserPassword("lowercase1!")).toThrow();
  });

  it("should throw if missing lowercase letter", () => {
    expect(() => new UserPassword("UPPERCASE1!")).toThrow();
  });

  it("should throw if missing number", () => {
    expect(() => new UserPassword("NoNumbersHere!")).toThrow();
  });

  it("should throw if missing symbol", () => {
    expect(() => new UserPassword("Password123")).toThrow();
  });
});

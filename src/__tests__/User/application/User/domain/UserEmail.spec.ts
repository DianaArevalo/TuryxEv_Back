import { UserEmail } from "~/lib/User/domain/UserEmail";

describe("domain/UserEmail", () => {
  it("should create a valid email", () => {
    const email = new UserEmail("test@example.com");
    expect(email.value).toBe("test@example.com");
  });

  it("should throw if missing '@'", () => {
    expect(() => new UserEmail("invalidemail.com")).toThrow(
      "UserEmail must be a valid email address"
    );
  });

  it("should throw if missing '.'", () => {
    expect(() => new UserEmail("invalid@email")).toThrow(
      "UserEmail must be a valid email address"
    );
  });
});

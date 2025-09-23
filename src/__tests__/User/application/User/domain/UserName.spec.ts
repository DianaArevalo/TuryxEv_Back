import { UserName } from "~/lib/User/domain/UserName";

describe("domain/UserName", () => {
  it("should create a valid name", () => {
    const name = new UserName("Carlos");
    expect(name.value).toBe("Carlos");
  });

  it("should throw if name has less than 3 characters", () => {
    expect(() => new UserName("Al")).toThrow(
      "El nombre debe tener al menos 3 caracteres"
    );
  });

  it("should accept exactly 3 characters", () => {
    const name = new UserName("Ana");
    expect(name.value).toBe("Ana");
  });
});
